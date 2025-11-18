import { Request, Response } from 'express';
import UserRepository from '../models/UserRepository';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { LoginRequest, ApiResponse, JWTPayload } from '../types';

export class AuthController {
  /**
   * Login user and return JWT tokens
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as LoginRequest;

      // Validation
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email and password are required',
        });
        return;
      }

      // Find user
      const user = await UserRepository.findByEmail(email.toLowerCase());
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
        return;
      }

      // Check if user is active
      if (!user.is_active) {
        res.status(403).json({
          success: false,
          message: 'Account is deactivated',
        });
        return;
      }

      // Verify password
      const isValidPassword = await comparePassword(password, user.password_hash || '');
      if (!isValidPassword) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
        return;
      }

      // Update last login
      await UserRepository.updateLastLogin(user.id);

      // Generate tokens
      const payload: JWTPayload = {
        userId: user.id,
        email: user.email,
        roleId: user.role_id,
        permissions: user.role?.permissions || [],
      };

      const token = generateToken(payload);
      const refreshToken = generateRefreshToken(payload);

      // Remove password from response
      const { password_hash, ...userWithoutPassword } = user;

      res.json({
        success: true,
        data: {
          user: userWithoutPassword,
          token,
          refreshToken,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed',
      });
    }
  }

  /**
   * Register new user (admin only)
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name, role_id } = req.body;

      // Validation
      if (!email || !password || !name || !role_id) {
        res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
        return;
      }

      // Check if user already exists
      const existingUser = await UserRepository.findByEmail(email.toLowerCase());
      if (existingUser) {
        res.status(409).json({
          success: false,
          message: 'User with this email already exists',
        });
        return;
      }

      // Hash password
      const password_hash = await hashPassword(password);

      // Create user
      const user = await UserRepository.create({
        email: email.toLowerCase(),
        password_hash,
        name,
        role_id,
        is_active: true,
      });

      // Remove password from response
      const { password_hash: _, ...userWithoutPassword } = user;

      res.status(201).json({
        success: true,
        data: userWithoutPassword,
        message: 'User created successfully',
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Registration failed',
      });
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          message: 'Refresh token is required',
        });
        return;
      }

      // Verify refresh token
      const payload = verifyRefreshToken(refreshToken);
      if (!payload) {
        res.status(401).json({
          success: false,
          message: 'Invalid or expired refresh token',
        });
        return;
      }

      // Verify user still exists and is active
      const user = await UserRepository.findById(payload.userId);
      if (!user || !user.is_active) {
        res.status(401).json({
          success: false,
          message: 'User not found or inactive',
        });
        return;
      }

      // Generate new tokens
      const newPayload: JWTPayload = {
        userId: user.id,
        email: user.email,
        roleId: user.role_id,
        permissions: user.role?.permissions || [],
      };

      const token = generateToken(newPayload);
      const newRefreshToken = generateRefreshToken(newPayload);

      res.json({
        success: true,
        data: {
          token,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({
        success: false,
        message: 'Token refresh failed',
      });
    }
  }

  /**
   * Get current user info
   */
  async me(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Not authenticated',
        });
        return;
      }

      const user = await UserRepository.findById(req.user.userId);
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      // Remove password from response
      const { password_hash, ...userWithoutPassword } = user;

      res.json({
        success: true,
        data: userWithoutPassword,
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get user info',
      });
    }
  }
}

export default new AuthController();
