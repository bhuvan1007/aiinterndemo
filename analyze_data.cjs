const data = require('./src/data.json');
const students = data.perStudent;
const ids = Object.keys(students);

console.log(`Total Students: ${ids.length}`);
ids.forEach(id => {
    console.log(`- ${students[id].user.name} (${id})`);
});
