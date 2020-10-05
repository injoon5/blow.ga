import * as React from 'react';
import Manifest from './components/Manifest';

export default class extends React.Component {
  render() {
    return (
      <>
        <head>
          <Manifest />
          <link rel="stylesheet" href="/fonts.css" />
          <link rel="stylesheet" href="/index.css" />
        </head>
        <body onClick={() => console.log('t')}>
          <main>
            <h1 style={{ fontWeight: 800 }}>
              <span style={{ color: '#007eff' }}>관리자 로그인</span>
            </h1>
            <form action="/admin" method="GET">
              <input type="text" name="id" placeholder="아이디"></input>
              <input type="text" name="ps" placeholder="비밀번호"></input>
              <input type="submit" value="로그인"></input>
            </form>
          </main>
        </body>
      </>
    );
  }
}
