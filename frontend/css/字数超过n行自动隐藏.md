CSS 设置一行文字，超出部分自动隐藏

```css
.textone {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 25px;
  max-height: 25px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
```

将行高和最大行高设置为一样的值，-webkit-line-clamp: 1，限制行数，这样就可以定义超过一行自动隐藏的效果了；设置超过两行自动隐藏是效果，line-height 和 max-heinght 成比例，-webkit-line-clamp 设为 2，这样就可以实现超过两行自动隐藏多余部分的效果了：

```css
.textTow {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 23px;
  max-height: 46px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

```javascript
// 根据字节长度不超过maxLength, 判断需要切割的字符数量
    ellipsis(value, maxLength) {
      if (!value) return '';
      var len = value.replace(/[\u0391-\uFFE5]/g, 'aa').length;
      console.log('value act length:', len);
      console.log('value ordi length:', value.length);
      if (len > maxLength) {
        let endIndex = 0;
        let testChar = '';
        for (let char of value) {
          testChar = value.slice(0,endIndex) + char;
          if (testChar.replace(/[\u0391-\uFFE5]/g, 'aa').length > maxLength) {
            break;
          }
          endIndex++;
        }
        return value.slice(0, endIndex) + '...';
      }
      return value;
    }
```
