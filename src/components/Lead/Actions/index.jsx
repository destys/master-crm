import React from "react";
import Print from "./Print";
import SendMessage from "./SendMessage";

const Index = ({ client, userName, leadId, lead }) => {
  return (
    <div className="flex gap-3 mb-4">
      <Print lead={lead} />
      <SendMessage client={client} userName={userName} leadId={leadId} />
    </div>
  );
};

export default Index;
