import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, isAuthenticated } from '@/lib/auth';
import { connectDB } from '@/lib/db/mongodb';
import { BlogModel } from '@/lib/db/models/Blog';
import { ContactRequestModel } from '@/lib/db/models/ContactRequest';
import { DashboardStats, ApiResponse } from '@/types';

// GET /api/stats - Get dashboard statistics (protected)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAuthenticated(session))) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get basic counts
    const [totalRequests, newRequests, totalBlogs, publishedBlogs] = await Promise.all([
      ContactRequestModel.countDocuments(),
      ContactRequestModel.countDocuments({ status: 'new' }),
      BlogModel.countDocuments(),
      BlogModel.countDocuments({ published: true }),
    ]);

    // Get total blog views
    const viewsResult = await BlogModel.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } },
    ]);
    const totalViews = viewsResult[0]?.totalViews || 0;

    // Get recent contact requests
    const recentRequests = await ContactRequestModel.find().sort({ createdAt: -1 }).limit(5).lean();

    // Get recent blogs
    const recentBlogs = await BlogModel.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title slug published views createdAt')
      .lean();

    // Get requests by industry
    const requestsByIndustry = await ContactRequestModel.aggregate([
      {
        $group: {
          _id: '$industry',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          industry: '$_id',
          count: 1,
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Get requests by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const requestsByMonth = await ContactRequestModel.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              {
                $cond: [
                  { $lt: ['$_id.month', 10] },
                  { $concat: ['0', { $toString: '$_id.month' }] },
                  { $toString: '$_id.month' },
                ],
              },
            ],
          },
          count: 1,
        },
      },
    ]);

    const stats: DashboardStats = {
      totalRequests,
      newRequests,
      totalBlogs,
      publishedBlogs,
      totalViews,
      recentRequests,
      recentBlogs,
      requestsByIndustry,
      requestsByMonth,
    };

    const response: ApiResponse<DashboardStats> = {
      success: true,
      data: stats,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
