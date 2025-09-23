
const randomString = crypto.randomUUID()

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

while (true) {
    console.log(new Date().toISOString() + " : " + randomString)
    await sleep(5000)
}
