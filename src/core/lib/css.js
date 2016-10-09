
export default {
    init () {
        // 初始化CSS样式
        let createCss = document.createElement('style');
        createCss.innerHTML = `
        .js-mdropload{
            z-index:1;
        }
        .js-mdropload-up {
            position: absolute;
            text-align: center;
            width: 100%;
            opacity:0;
            transition-duration: .2s;
        }
        .js-mdropload-message {
            opacity:0;
        }
        `;
        document.body.appendChild(createCss);
    }
}