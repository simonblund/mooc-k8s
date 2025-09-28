const randomString = process.argv[2] || Math.random().toString(36).slice(2);

setInterval(() => {
  console.log(new Date().toISOString() + " : " + randomString);
}, 5000);
