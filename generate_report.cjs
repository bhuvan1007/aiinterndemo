const fs = require('fs');
const data = require('./src/data.json');
const students = data.perStudent;

let mdContent = "# Student Data Summary\n\n";
mdContent += `**Total Students:** ${Object.keys(students).length}\n\n`;
mdContent += "| Name | Email | Grade | Accuracy | Mastery | Total Time |\n";
mdContent += "|---|---|---|---|---|---|\n";

Object.values(students).forEach(s => {
    const stats = s.overall?.stats || { grade: 'N/A', accuracy: 0, mastery: 0, totalTime: 0 };
    const time = Math.round((stats.totalTime || 0) / 60) + "m";
    mdContent += `| ${s.user.name} | ${s.user.email} | ${stats.grade} | ${stats.accuracy}% | ${stats.mastery} | ${time} |\n`;
});

mdContent += "\n\n## Detailed Student List\n";

Object.values(students).forEach(s => {
    const stats = s.overall?.stats || { accuracy: 0, coverage: 0 };
    mdContent += `\n### ${s.user.name}\n`;
    mdContent += `- **ID**: ${s.user.googleId}\n`;
    mdContent += `- **Email**: ${s.user.email}\n`;
    mdContent += `- **Performance**: ${stats.accuracy}% Accuracy, ${stats.coverage}% Coverage\n`;
});

fs.writeFileSync('student_details.md', mdContent);
console.log("Report generated: student_details.md");
