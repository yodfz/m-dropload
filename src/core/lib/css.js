
export default {
    init () {
        // 初始化CSS样式
        let createCss = document.createElement('style');
        createCss.innerHTML = `
        .js-mdropload-up {
            position: absolute;
            text-align: center;
            width: 100%;
        }
        `;
        document.body.appendChild(createCss);
    }
}