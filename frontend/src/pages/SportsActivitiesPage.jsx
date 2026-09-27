import React from 'react';
import { Trophy, Award } from 'lucide-react';

export const SportsActivitiesPage = () => {
  const achievements = [
    { student: "Mohit Sharma (Class 10-A)", title: "District Football Championship 2025", category: "Sports", badge: "🏆 Champion Winner", year: "2025" },
    { student: "Mohit Sharma (Class 10-A)", title: "Inter-School Science Exhibition", category: "Academics", badge: "🥇 1st Rank Gold", year: "2025" },
    { student: "Mohit Sharma (Class 10-A)", title: "State Debate Competition", category: "Cultural", badge: "🏅 Runner Up", year: "2026" },
    { student: "Rahul Gupta (Class 10-A)", title: "Annual Athletic Meet 100m Sprint", category: "Sports", badge: "🥇 Gold Medal", year: "2025" },
    { student: "Aman Singh (Class 10-A)", title: "State Level Chess Tournament", category: "Mind Sports", badge: "🏆 Winner", year: "2025" },
    { student: "Priya Sharma (Class 10-A)", title: "National Level Badminton Singles", category: "Sports", badge: "🥈 Silver Medal", year: "2025" }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-400" /> Student Activities & Sports Trophy Wall
          </h1>
          <p className="text-xs text-slate-400">Inter-school championships, sports day winners, science exhibition medals & certificate archive.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((item, idx) => (
          <div key={idx} className="glass-card glass-card-hover rounded-2xl p-6 border border-amber-500/20 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase">
                {item.category}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">{item.year}</span>
            </div>

            <h3 className="font-extrabold text-white text-base leading-snug">{item.title}</h3>
            <p className="text-xs text-indigo-400 font-bold">{item.student}</p>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black rounded-xl text-xs shadow">
                {item.badge}
              </span>
              <Award className="h-5 w-5 text-amber-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
