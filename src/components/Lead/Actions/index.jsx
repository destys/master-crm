import React from "react";
import Print from "./Print";
import SendMessage from "./SendMessage";

const Index = () => {
  return (
    <div className="flex gap-3 mb-4">
      <Print />
      <SendMessage />
    </div>
  );
};

export default Index;
