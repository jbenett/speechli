const theme = Object.freeze({
    fontFamily: "'Muli', sans-serif",
    primary: "#5ce5c2",
    danger: "#FF4741",
    fontColor: {
        regular: "#232323",
        regularPlaceholder: "#757575"
    },
    reset: {
        input: `
            -webkit-highlight: none;
            -webkit-appearance: none;
            outline: none;
        `
    },
    dropShadow: {
        subtle: `
            -webkit-box-shadow: 0px 0px 23px -1px rgba(35, 35, 35, 0.15);
            -moz-box-shadow: 0px 0px 23px -1px rgba(35, 35, 35, 0.15);
            box-shadow: 0px 0px 23px -1px rgba(35, 35, 35, 0.15);
        `,
        regular: `
            -webkit-box-shadow: 0px 0px 23px 1px rgba(35, 35, 35, 0.20);
            -moz-box-shadow: 0px 0px 23px 1px rgba(35, 35, 35, 0.20);
            box-shadow: 0px 0px 23px 1px rgba(35, 35, 35, 0.20);
        `
    }
});

export default theme;
