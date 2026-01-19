import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Step1_JSX from './01_JSX'
import Step2_Compenents from './02_Component'
import Step3_Props from './03_Props'
import Step4_State from './04_State'
import Step5_Hooks from './05_Hooks'
import Step6_Events from './06_EventHandler'
import Step7_Conditional from './07_Concitional'
import Step8_List from './08_list'
import FragmentExample from './09_Frangment'
import ContextComponent from './10_Context'
import LoginExample from './10_2_ContextEx'
import RouterComponent from './11_Router'
import CartExample from './100_ContextEx'
import RefComponent from './12_Ref'
import Fetch from './13_Fetch_GET'
import FetchEx from './98_FetchEx'
import FetchComponent from './13_FETCH_POST'
import FetchPostEx from './97_FetchPostEx'
import AxiosComponent from './14_Axios'
import AxiosPractice from './AxiosPractice'
import AxiosServer from './15_AxiosServer'
import { BoardList, BoardListWithOut, MemoExample, UseCallbackExample, UseMemoExample } from './16_Performance'
import InterceptorExample from './17_AxiosInterceptor'

function App() {

  return (
    <div>
      <h1>React 학습</h1>
      <section>
        <h2>JSX 문법</h2>
        {/* 01_JSX 컴포넌트를 사용하기 위해 불러오기 (import) */}
        <Step1_JSX></Step1_JSX>
      </section>

      <section>
        <h2>컴포넌트 기본</h2>
        <Step2_Compenents></Step2_Compenents>
      </section>

      <section>
        <h2>Props 심화</h2>
        <Step3_Props></Step3_Props>
      </section>

      <section>
        <h2>State 관리</h2>
        <Step4_State></Step4_State>
      </section>

      <section>
        <h2>Hooks(useEffect 활용)</h2>
        <Step5_Hooks></Step5_Hooks>
      </section>

      <section>
        <h2>EventHanlder 관리</h2>
        <Step6_Events></Step6_Events>
      </section>

      <section>
        <h2>Conditional (조건부 랜더링)</h2>
        <Step7_Conditional></Step7_Conditional>
      </section>

      <section>
        <h2>List (목록 랜더링)</h2>
        <Step8_List></Step8_List>
      </section>

      <section>
        <h2>Fragment 사용</h2>
        <FragmentExample></FragmentExample>
      </section>

      <section>
        <h2>Context 활용</h2>
        <ContextComponent></ContextComponent>
      </section>

      <section>
        <h2>Context 예제</h2>
        <LoginExample></LoginExample>
      </section>

      <section>
        <h2>Context 예제2</h2>
        <CartExample></CartExample>
      </section>

      <section>
        <h2>Router 처리</h2>
        <RouterComponent></RouterComponent>
      </section>

      <section>
        <h2>Ref 사용해보기</h2>
        <RefComponent></RefComponent>
      </section>

      <section>
        <h2>Fetch 사용해보기</h2>
        <Fetch></Fetch>
      </section>

      <section>
        <h2>Fetch 예제</h2>
        <FetchEx></FetchEx>
      </section>

      <section>
        <h2>Fetch 사용해보기</h2>
        <FetchComponent></FetchComponent>
      </section>

      <section>
        <h2>Fetch(POST) 연습문제</h2>
        <Fetch></Fetch>
        <FetchEx></FetchEx>
        <FetchComponent></FetchComponent>
        <FetchPostEx></FetchPostEx>
      </section>

      <section>
        <h2>Fetch(POST) 연습문제</h2>
        <AxiosComponent></AxiosComponent>
      </section>

      <br /><br /><br />

      <section>
        <h2>Axios 연습문제</h2>
        <AxiosPractice></AxiosPractice>
      </section>

      <section>
        <h2>Axios 사용해보기</h2>
        <AxiosComponent></AxiosComponent>
        <AxiosPractice></AxiosPractice>
       
      </section>

      <section>
        <h2>래액트 성능 최적화 도구들</h2>
       {/* <MemoExample></MemoExample> */}
       {/* <UseMemoExample></UseMemoExample> */}
       {/*<UseCallbackExample></UseCallbackExample> */}
       {/*  <BoardList></BoardList> */}
       {/*  <BoardListWithOut></BoardListWithOut> */}
        <InterceptorExample></InterceptorExample>
      </section>
    


      
      


    </div>
  )
}

export default App
