


/**
 * 窗口拖拽功能
 * @param {*} target 
 */
export function windowDragEvent(target) {
    const dragDom = $(target);
    this.isDrag = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.windowX = 0;
    this.windowY = 0;
    dragDom.mousedown((e) => {
        console.log('mousedown')
        this.isDrag = true;
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
        this.windowX = e.currentTarget.offsetLeft;
        this.windowY = e.currentTarget.offsetTop;
    });

    dragDom.mousemove((e) => {
        console.log('mousemove')
        if (this.isDrag) {
            e.currentTarget.style.left =
                this.windowX + e.pageX - this.mouseX + 'px';
            e.currentTarget.style.top = this.windowY + e.pageY - this.mouseY + 'px';
        }
    });

    dragDom.mouseup((e) => {
        console.log('mouseup')
        this.isDrag = false;
    });
}

/**
 * window跳至锚点
 * @param {*} node 
 */
export function jump(anchor) {
    let jumpDom = document.querySelectorAll(anchor);
    jumpDom[0].scrollIntoView();
}

/**
 * 局部dom跳至锚点
 * @param {*} scrollBox 
 * @param {*} anchor 
 */
export function jump2(scrollBox, anchor) {
    let jumpDom = document.getElementById(anchor);
    scrollBox.scrollTop = jumpDom.offsetTop
}
