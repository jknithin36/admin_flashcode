// const BASE_URL = "https://serverflash.onrender.com";
const BASE_URL = "https://serverflash.onrender.com";

// ---------------------- Interfaces ----------------------

export interface TotalUsersResponse {
  total_users: number;
  change: string;
  trend: string;
  subtext: string;
  icon: string;
}

export interface TotalQuestionsResponse {
  total_questions: number;
  change: string;
  trend: string;
  subtext: string;
  icon: string;
}

export interface TotalAnswersResponse {
  total_answers: number;
  change: string;
  trend: string;
  subtext: string;
  icon: string;
}

export interface AnswerGrowthResponse {
  answer_growth: string;
  growth_text: string;
  icon: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  email: string;
  questionsAnswered: number;
  accountAge: number;
  lastActive: string;
}

export interface TrendData {
  date: string;
  questions: number;
  answers: number;
}

export interface Tag {
  id: string;
  name: string;
  questions: number;
  createdAt: string;
  updatedAt: string;
}

export interface TagDistribution {
  tag: string;
  count: number;
}

export interface TopTag {
  tag: string;
  count: number;
  percentage: number;
  createdAt: string;
}

// ---------------------- API Calls ----------------------

// Total Users Trend
export async function fetchTotalUsersTrend(): Promise<TotalUsersResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/users/total_users_trend`);
    if (!response.ok) {
      throw new Error("Failed to fetch total users trend");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching total users trend:", error);
    return null;
  }
}

// Total Questions Trend
export async function fetchTotalQuestionsTrend(): Promise<TotalQuestionsResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/questions/total_questions_trend`);
    if (!response.ok) {
      throw new Error("Failed to fetch total questions trend");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching total questions trend:", error);
    return null;
  }
}

// Total Answers Trend
export async function fetchTotalAnswersTrend(): Promise<TotalAnswersResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/answers/total_answers_trend`);
    if (!response.ok) {
      throw new Error("Failed to fetch total answers trend");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching total answers trend:", error);
    return null;
  }
}

// Answer Growth
export async function fetchAnswerGrowth(): Promise<AnswerGrowthResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/answers/answer_growth`);
    if (!response.ok) {
      throw new Error("Failed to fetch answer growth");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching answer growth:", error);
    return null;
  }
}

// Leaderboard
export async function fetchLeaderboard(
  range: string
): Promise<LeaderboardUser[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/users/leaderboard?range=${range}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch leaderboard data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
}

// User Summary
export async function fetchUserSummary(): Promise<{
  total_users: number;
  active_users: number;
}> {
  try {
    const response = await fetch(`${BASE_URL}/users/api/activity_summary`);
    if (!response.ok) {
      throw new Error("Failed to fetch user summary");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user summary:", error);
    return { total_users: 0, active_users: 0 };
  }
}

// Questions vs Answers Trend
export async function fetchQuestionsAnswersTrend(
  range: string
): Promise<TrendData[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/analytics/questions-answers?range=${range}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch questions vs answers trend");
    }
    const data = await response.json();
    return data.trend_data;
  } catch (error) {
    console.error("Error fetching questions vs answers trend:", error);
    return [];
  }
}

// Views Trend
// export async function fetchViewsTrend(range: string): Promise<TrendData[]> {
//   try {
//     console.log(`Fetching views trend for: ${range}`);
//     const response = await fetch(`${BASE_URL}/api/views/trend?range=${range}`);

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `Failed to fetch views trend: ${response.status} - ${errorText}`
//       );
//     }

//     const data = await response.json();
//     console.log("Fetched Data:", data);
//     return data.trend_data;
//   } catch (error) {
//     console.error("Error fetching views trend:", error);
//     return [];
//   }
// }
export async function fetchViewsTrend(range: string) {
  try {
    console.log(`Fetching views trend for: ${range}`);
    const response = await fetch(`${BASE_URL}/api/views/trend?range=${range}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch views trend: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Fetched Data:", data); // ✅ Should contain `trend_data`

    return data.trend_data; // ✅ Extract only trend_data array
  } catch (error) {
    console.error("Error fetching views trend:", error);
    return []; // ✅ Return empty array on error
  }
}

export async function addImportantDate(eventData: {
  event: string;
  date: string;
  semester: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/api/important-dates/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error("Failed to add important date");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding important date:", error);
    return null;
  }
}

export async function fetchAllTags(): Promise<Tag[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/tags/`);
    if (!response.ok) {
      throw new Error("Failed to fetch tags");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

export async function fetchTagDistribution(): Promise<TagDistribution[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/tags/distribution`);
    if (!response.ok) {
      throw new Error("Failed to fetch tag distribution");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tag distribution:", error);
    return [];
  }
}

export async function fetchTopTags(): Promise<TopTag[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/tags/top`);
    const data = await res.json();
    return data.top_tags;
  } catch (err) {
    console.error("Failed to fetch top tags:", err);
    return [];
  }
}
export async function addMagazine(formData: FormData) {
  const res = await fetch(
    "https://serverflash.onrender.com/api/magazines/add",
    {
      method: "POST",
      body: formData,
    }
  );
  return res;
}
