import {
  fetchTotalUsersTrend,
  fetchTotalQuestionsTrend,
  fetchTotalAnswersTrend,
  fetchAnswerGrowth,
} from "@/server/api";

import { StatCard } from "@/components/cards/StatCard";
import Heading from "@/components/header/Heading";
import UserData from "@/components/user/Home";
import { FlashcodeChart } from "@/components/ChartArea";

const Home = async () => {
  // Optimized parallel data fetching
  const [userStats, questionStats, answersStats, answerGrowthStats] =
    await Promise.all([
      fetchTotalUsersTrend(),
      fetchTotalQuestionsTrend(),
      fetchTotalAnswersTrend(),
      fetchAnswerGrowth(),
    ]);

  return (
    <section>
      <Heading title="Flashcode" subtag="Built for better" />
      <hr className="bg-white h-px w-1/2 mx-auto border-0 my-4" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 px-4 lg:px-6 py-6">
        {userStats ? (
          <StatCard
            title="Total Users"
            value={userStats.total_users}
            change={userStats.change}
            trend={userStats.trend}
            subtext={userStats.subtext}
            icon={userStats.icon === "up" ? "up" : "down"}
          />
        ) : (
          <StatCard
            title="Total Users"
            value="Loading..."
            change="..."
            trend="..."
            subtext="Total registered users on Flashcode"
            icon="down"
          />
        )}
        {questionStats ? (
          <StatCard
            title="Total Questions"
            value={questionStats.total_questions}
            change={questionStats.change}
            trend={questionStats.trend}
            subtext={questionStats.subtext}
            icon={questionStats.icon === "up" ? "up" : "down"}
          />
        ) : (
          <StatCard
            title="Total Questions"
            value="Loading..."
            change="..."
            trend="..."
            subtext="Total number of questions asked on Flashcode"
            icon="down"
          />
        )}
        {answersStats ? (
          <StatCard
            title="Total Answers"
            value={answersStats.total_answers}
            change={answersStats.change}
            trend={answersStats.trend}
            subtext={answersStats.subtext}
            icon={answersStats.icon === "up" ? "up" : "down"}
          />
        ) : (
          <StatCard
            title="Total Answers"
            value="Loading..."
            change="..."
            trend="..."
            subtext="Total number of answers provided on Flashcode"
            icon="down"
          />
        )}
        {answerGrowthStats ? (
          <StatCard
            title="Answer Growth"
            value={answerGrowthStats.answer_growth}
            change=""
            trend={answerGrowthStats.growth_text}
            subtext=""
            icon=""
          />
        ) : (
          <StatCard
            title="Answer Growth"
            value="Loading..."
            change="..."
            trend="..."
            subtext=""
            icon=""
          />
        )}
      </div>
      <div className="px-6 py-4 mt-5">
        <UserData />
      </div>
      <div className="px-6 py-4 mt-5">
        <FlashcodeChart />
      </div>
    </section>
  );
};

export default Home;
