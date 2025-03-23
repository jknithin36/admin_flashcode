import { StatCard } from "@/components/cards/StatCard";
import Heading from "@/components/header/Heading";

const Home = () => {
  return (
    <section>
      <Heading title="Flashcode" subtag="Build for better" />
      <hr className="bg-white h-px w-1/2 mx-auto border-0 my-4" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 px-4 lg:px-6 py-6">
        <StatCard
          title="Total Revenue"
          value="$1,250.00"
          change="+12.5%"
          trend="Trending up this month"
          subtext="Visitors for the last 6 months"
          icon="up"
        />
        <StatCard
          title="New Customers"
          value="1,234"
          change="-20%"
          trend="Down 20% this period"
          subtext="Acquisition needs attention"
          icon="down"
        />
        <StatCard
          title="Active Accounts"
          value="45,678"
          change="+12.5%"
          trend="Strong user retention"
          subtext="Engagement exceed targets"
          icon="up"
        />
        <StatCard
          title="Growth Rate"
          value="4.5%"
          change="+4.5%"
          trend="Steady performance"
          subtext="Meets growth projections"
          icon="up"
        />
      </div>
      <hr className="bg-white h-px w-full mx-auto border-0 my-4" />
    </section>
  );
};

export default Home;
