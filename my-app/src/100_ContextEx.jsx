import { createContext, useContext, useState } from "react";

//스타일 부여 객체
const styles = {
    box : {border : '1px solid #ccc', padding : '15px', margin : '10px', borderRadius : '5px'},
    button : {padding : '8px 16px', marginRight : '5px', cursor : 'pointer'},
    header : {display : 'flex', justifyContent : 'space-between', padding : '10px', boarderBottom : '1px solid #eee'}
};

//1. Context 생성
const CartContext = createContext();



//2. Provider 컴포넌트
const CartProvider = ({children}) => {
    //장바구니 목록 State
    const [cart, setCart] = useState([]);

    //장바구니에 추가 함수
    const addCart = (product) => {
        setCart(prevCart => {
            //이미 있는 상품인지 확인 구문
            //있으면 수량 증가 없으면 새로 추가
            const isExist = prevCart.find(item => item.id === product.id);
            if(isExist){
                return prevCart.map(item =>
                    item.id === product.id ? {...item, quantity : item.quantity+1} : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        
    };
    


    //**장바구니에서 제거 함수
    const removeCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    //**총 개수 계산 함수
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    //**총 가계 계산 함수
    const totalPrice = cart.reduce((sum, item)=> sum + (item.price * item.quantity), 0);
    // 하위 요소에게 제공하는 구문 (위에서 만든 요소들 중 필요한 요소들 전달하기) */
    return (
        <CartContext.Provider value={{cart, addCart, removeCart, totalCount, totalPrice}}>
            {children}
        </CartContext.Provider>
    );
};


//3. Context를 사용하는 컴포넌트들

//헤더 - 장바구니 개수 표시
const Header = () => {
    //개수 받아오기
    const{totalCount} = useContext(CartContext);

    return (

        <div style={{...styles.box, backgroundColor : 'black', color : 'white'}}>
            <h2>🛒 쇼핑몰</h2>
            <p>장바구니 : {totalCount} 개</p>
        </div>
    );
};

//상품 목록
const ProductList = () => {
    //상품 추가 함수 받아오기
    const {addCart} = useContext(CartContext);

    //상품 데이터
    const products = [
        {id : 1, name : '딸기', price : 13500},
        {id : 2, name : '바나나', price : 4500},
        {id : 3, name : '샤인머스켓', price : 7000}
    ];

    return (
        <div style={styles.box}>
            상품 목록
            {/*여기에 상품 목록 넣기 */}
            {/*상품 목록 출력은 이미지 참고 */}
            {
                        products.map(product => (
                            <div key={product.id} style={{borderBottom : '1px solid lightgray'}}>
                                <span style={{display : 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize:'19px'}}>
                                    {product.name} - {product.price}원
                                    <button style={{backgroundColor:'green', color : 'white'}} onClick={() => addCart(product)}>담기</button>
                                </span>
                            </div>
                        ))
                    }

        </div>
    );
};

//장바구니
const Cart = () => {
    //필요 데이터 받아오기
    const {cart, totalPrice, removeCart} = useContext(CartContext);


    return (
        <div style={styles.box}>
            <h3>장바구니</h3>
            {/*장바구니가 비었다면 p태그로 '장바구니가 비어있습니다.' 출력 */}
            {/*비어있지 않다면 목록 출력 (이미지 참고) */}
            {cart.length === 0 ? (
                <p> 장바구니가 비어있습니다.</p>
            ) : (
                <div style={{textAlign : 'right', marginTop : '15px', fontWeight : 'bold'}}>
                    총 금액 : {totalPrice().toLocaleString()}원
                </div>
            )}

            
        </div>
    );
};

//메인 컴포넌트
const CartExample = () => {
    return (
        //위에서 만든것들 하단에 추가 및 Provider 처리
        <CartProvider>
            <div style={{maxWidth : '500px', margin : '0 auto'}}>
                <h1>장바구니 Context 예제</h1>
                <Header></Header>
                <ProductList></ProductList>
                <Cart></Cart>
            </div>
        </CartProvider>
    );
};

export default CartExample;