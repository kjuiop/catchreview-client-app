
// NoSSR 은 서버에서 랜더링되어야하지만, 서버에서는 브라우저의 window 에 접근하지 못함
const NoSSR = () => {
    return <p>width: {window.innerWidth}</p>;
};
export default NoSSR;
