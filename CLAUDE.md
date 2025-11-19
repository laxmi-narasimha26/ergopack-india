# CLAUDE.md - AI Assistant Guide for ergopack-india

This document serves as a comprehensive guide for AI assistants (like Claude) working with the ergopack-india codebase. It contains essential information about the project structure, development workflows, conventions, and best practices.

## Project Overview

**Repository:** ergopack-india
**Organization:** laxmi-narasimha26
**Status:** Initial setup phase

### About the Project

Ergopack India is [PROJECT DESCRIPTION TO BE ADDED - likely related to packaging, logistics, or ergonomic solutions in India].

**Key Objectives:**
- [TO BE DEFINED]
- [TO BE DEFINED]

## Repository Structure

```
ergopack-india/
├── .git/                 # Git version control
├── CLAUDE.md            # This file - AI assistant guide
└── [Additional structure to be added as project grows]
```

### Expected Directory Structure (To Be Implemented)

```
ergopack-india/
├── src/                 # Source code
│   ├── components/      # Reusable components
│   ├── services/        # Business logic and API services
│   ├── utils/           # Utility functions
│   └── config/          # Configuration files
├── tests/               # Test files
├── docs/                # Documentation
├── public/              # Public assets
├── .github/             # GitHub workflows and configurations
├── package.json         # Dependencies and scripts
├── README.md            # Project documentation
└── CLAUDE.md            # This file
```

## Development Workflow

### Branch Strategy

**Current Branch:** `claude/claude-md-mi1qvph9rykr5wq5-01G1U7ppVBuGFxKpX1iE1aaL`

**Branch Naming Conventions:**
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `claude/*` - AI assistant working branches

### Git Workflow

1. **Always work on designated branches** - Never push directly to main
2. **Commit often** with clear, descriptive messages
3. **Push when ready** using: `git push -u origin <branch-name>`
4. **Pull before starting work** to sync with remote changes

### Commit Message Conventions

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

**Examples:**
```
feat(auth): add user authentication module
fix(api): resolve timeout issue in payment processing
docs(readme): update installation instructions
```

## Code Conventions

### General Guidelines

1. **Code Quality**
   - Write clean, readable, and maintainable code
   - Follow DRY (Don't Repeat Yourself) principle
   - Use meaningful variable and function names
   - Add comments for complex logic

2. **Security**
   - Never commit sensitive information (API keys, passwords, tokens)
   - Validate all user inputs
   - Follow OWASP security best practices
   - Avoid common vulnerabilities: XSS, SQL injection, CSRF, etc.

3. **Testing**
   - Write unit tests for new features
   - Maintain test coverage above 80%
   - Run tests before committing
   - Fix failing tests immediately

4. **Documentation**
   - Document all public APIs
   - Update README.md when adding new features
   - Keep CLAUDE.md updated with structural changes
   - Add inline comments for complex algorithms

### Code Style (To Be Defined)

[Language-specific style guides will be added as the tech stack is determined]

**Potential Stack Considerations:**
- Frontend: React, Vue, Angular, or other
- Backend: Node.js, Python, Java, or other
- Database: PostgreSQL, MongoDB, MySQL, or other
- Cloud: AWS, GCP, Azure, or other

## Testing Strategy

### Test Types

1. **Unit Tests** - Test individual functions and components
2. **Integration Tests** - Test component interactions
3. **End-to-End Tests** - Test complete user workflows
4. **Performance Tests** - Test application performance

### Running Tests

[To be added when testing framework is implemented]

```bash
# Example commands (to be updated)
npm test                 # Run all tests
npm run test:unit       # Run unit tests
npm run test:e2e        # Run e2e tests
npm run test:coverage   # Generate coverage report
```

## Build and Deployment

### Build Process

[To be added when build system is implemented]

```bash
# Example commands (to be updated)
npm install             # Install dependencies
npm run build           # Build for production
npm run dev             # Start development server
npm run lint            # Run linter
```

### Deployment

[Deployment strategy and CI/CD pipeline details to be added]

## AI Assistant Specific Guidelines

### When Working on This Codebase

1. **Always Check First**
   - Read existing code before making changes
   - Understand the context and dependencies
   - Check for similar implementations
   - Review recent commits for patterns

2. **Use Tools Effectively**
   - Use TodoWrite for complex multi-step tasks
   - Use Task tool with Explore for codebase exploration
   - Use Read/Edit/Write tools for file operations
   - Avoid unnecessary bash commands for file operations

3. **Communication**
   - Provide clear explanations of changes
   - Reference specific files and line numbers (e.g., `src/app.js:42`)
   - Explain trade-offs in technical decisions
   - Ask for clarification when requirements are ambiguous

4. **Code Changes**
   - Make targeted, focused changes
   - Test changes before committing
   - Update related documentation
   - Follow existing code patterns and conventions

5. **Error Handling**
   - Always handle errors gracefully
   - Provide meaningful error messages
   - Log errors appropriately
   - Add error recovery mechanisms

### Common Tasks

**Adding a New Feature:**
1. Create a feature branch
2. Implement the feature with tests
3. Update documentation
4. Commit and push changes
5. Create a pull request

**Fixing a Bug:**
1. Reproduce the bug
2. Write a failing test
3. Fix the bug
4. Verify the test passes
5. Commit and push

**Refactoring:**
1. Ensure tests exist and pass
2. Make incremental changes
3. Run tests after each change
4. Update documentation
5. Commit with clear messages

## Project-Specific Context

### Domain Knowledge

**Packaging Industry in India:**
- Understanding of packaging materials and standards
- Knowledge of Indian regulatory requirements
- Awareness of logistics and supply chain practices
- Familiarity with ergonomic design principles

### Key Stakeholders

[To be defined]

### Business Rules

[To be defined as project requirements are established]

## Dependencies and Tools

### Development Dependencies

[To be added when package.json is created]

### Recommended Tools

- **Version Control:** Git
- **Code Editor:** VS Code, WebStorm, or similar
- **API Testing:** Postman, Insomnia
- **Database Management:** [To be defined]
- **Monitoring:** [To be defined]

## Troubleshooting

### Common Issues

[This section will be populated as common issues are encountered]

**Issue:** [Description]
**Solution:** [Steps to resolve]

## Environment Setup

### Prerequisites

[To be defined based on tech stack]

### Installation Steps

[To be added when project structure is established]

```bash
# Example (to be updated)
git clone <repository-url>
cd ergopack-india
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```

### Environment Variables

[To be documented when configuration is implemented]

```
# Example .env structure
DATABASE_URL=
API_KEY=
PORT=
NODE_ENV=
```

## Resources

### Documentation Links

- [Project Wiki](TO_BE_ADDED)
- [API Documentation](TO_BE_ADDED)
- [Design System](TO_BE_ADDED)

### External Resources

- [Git Documentation](https://git-scm.com/doc)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

## Changelog

### Version History

- **2025-11-16**: Initial CLAUDE.md created - Repository setup phase
- [Future updates will be logged here]

## Notes for AI Assistants

### Important Reminders

1. **Never commit sensitive data** - Always check for API keys, passwords, tokens
2. **Test before pushing** - Run tests and builds before committing
3. **Follow the branch strategy** - Always work on designated branches
4. **Update documentation** - Keep this file and README.md current
5. **Ask when uncertain** - Clarify requirements before implementing
6. **Security first** - Always consider security implications
7. **Think about scale** - Design for growth and performance
8. **Maintain consistency** - Follow established patterns

### When This File Needs Updates

Update CLAUDE.md when:
- Project structure changes significantly
- New development tools are added
- Coding conventions are established or modified
- New workflows or processes are introduced
- Common issues and solutions are identified
- Dependencies or tech stack changes occur

### Quick Reference

**Current Status:** Initial repository setup
**Tech Stack:** To be determined
**Primary Language:** To be determined
**Framework:** To be determined
**Database:** To be determined

---

**Last Updated:** 2025-11-16
**Maintained By:** AI Assistants and Development Team
**Version:** 1.0.0

For questions or updates to this document, consult with the development team or check the project repository for the latest version.
