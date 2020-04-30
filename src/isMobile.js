import isMobile from "ismobilejs";

const isPhone = isMobile(window.navigator).phone;

export default isPhone;