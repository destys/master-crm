import React from "react";
import Print from "./Print";
import SendMessage from "./SendMessage";

const Index = ({ client, userName, leadId }) => {
  return (
    <div className="flex gap-3 mb-4">
      <Print />
      <SendMessage client={client} userName={userName} leadId={leadId} />
    </div>
  );
};

export default Index;
