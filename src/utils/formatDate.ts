const formatTime = (time: number) => {
    const hours = Math.floor(time);
    console.log(hours);
    const minutes = (time - hours) * 60;
    console.log(minutes);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes === 0 ? '00' : '30';
    return `${formattedHours}:${formattedMinutes} ${period}`;
};

export default formatTime;