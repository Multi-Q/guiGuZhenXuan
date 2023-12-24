/**
 * 自己封装一个函数，用户判断当前时间是否是早上|上午|下午|晚上
 * @return {string} message (早上|上午|下午|晚上)
 */
export function getTime() {
    let message: string = "";
    const hour: number = new Date().getHours();
    if (hour <= 9) {
        message = "早上";
    } else if (hour <= 12) {
        message = "上午";
    } else if (hour <= 18) {
        message = "下午";
    } else {
        message = "晚上";
    }
    return message;
}