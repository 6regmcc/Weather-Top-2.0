
const time = "2022-09-07T22:11:43.003Z"

const getLocalTime = (time) => {
  let dateTime = new Date(time)
  return dateTime.toLocaleDateString(undefined, {hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',})
}

console.log(getLocalTime("2022-09-07T22:11:43.003Z"));

