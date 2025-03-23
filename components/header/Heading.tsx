import React from "react";

interface Heading {
  title: string;
  subtag: string;
}
const Heading = ({ title, subtag }: Heading) => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tight">
        {title}
      </h1>
      <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
        {subtag}
      </p>
    </div>
  );
};

export default Heading;
