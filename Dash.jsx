// components/GitHubDashboard.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, GitBranch, AlertCircle, Clock } from "lucide-react";

const GitHubDashboard = ({ owner, repo, token }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchRepo = async () => {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      setData(json);
    };
    fetchRepo();
  }, [owner, repo, token]);

  if (!data) return <p>Loading...</p>;

  return (
    <Card className="max-w-xl mx-auto mt-10 p-4 shadow-xl rounded-2xl">
      <CardContent>
        <h2 className="text-2xl font-bold mb-2">{data.full_name}</h2>
        <p className="text-gray-600 mb-4">{data.description}</p>
        <div className="flex gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-1"><Star size={16} /> {data.stargazers_count}</div>
          <div className="flex items-center gap-1"><GitBranch size={16} /> {data.forks_count}</div>
          <div className="flex items-center gap-1"><AlertCircle size={16} /> {data.open_issues_count}</div>
          <div className="flex items-center gap-1"><Clock size={16} /> {new Date(data.updated_at).toLocaleString()}</div>
        </div>
      </CardContent>
    </Card>
  );
};
