import React, { useState } from "react";
import Button from "../components/Button";
import style from "./Home.module.css";

const Home = () => {
  const KEY = "blogList";
  const KEY_ITEM = localStorage.getItem(KEY);
  const [blogList, setBlogList] = useState(
    KEY_ITEM
      ? JSON.parse(KEY_ITEM)
      : [
          {
            title: "샘플 게시물",
            date: "yyyy년 mm월 dd일 hh:mm",
            contents: "안녕하세요 반가워요👋",
          },
        ]
  );
  const [formStatus, setFormStatus] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContents, setBlogContents] = useState("");

  return (
    <div className={style.container}>
      <div className={style.formWrap}>
        <div className={style.controller}>
          <Button text="글 정렬하기" blogList={blogList} sortFn={setBlogList} />
          <div
            style={{
              width: "10px",
            }}
          ></div>
          <Button
            text={formStatus ? "취소" : "글 작성하기"}
            activeFn={setFormStatus}
          />
        </div>
        {formStatus ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const date = new Date();
              const today = {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDay(),
                hour: date.getHours(),
                minutes: date.getMinutes(),
              };
              let copy = [...blogList];
              let contents = {
                title: blogTitle,
                date: ` ${today.year}년 ${today.month}월 ${today.day}일 ${today.hour}:${today.minutes}`,
                contents: blogContents,
                comments: [],
              };
              copy.unshift(contents);
              setBlogList(copy);
              localStorage.setItem(KEY, JSON.stringify(copy));
              setFormStatus(false);
            }}
          >
            <div className={style.formItem}>
              <label htmlFor="title">제목</label>
              <hr />
              <input
                id="title"
                type="text"
                placeholder="제목을 입력해주세요."
                required
                onChange={(event) => {
                  setBlogTitle(event.target.value);
                }}
              ></input>
            </div>
            <div className={style.formItem}>
              <label htmlFor="contents">상세내용</label>
              <hr />
              <textarea
                id="contents"
                placeholder="상세내용을 입력해주세요."
                required
                onChange={(event) => {
                  setBlogContents(event.target.value);
                }}
              ></textarea>
            </div>
            <div className={style.controller}>
              <Button text="초기화" type="reset" />
              <div
                style={{
                  width: "10px",
                }}
              ></div>
              <Button text="등록" type="submit" />
            </div>
          </form>
        ) : null}
      </div>
      {blogList.length !== 0 ? (
        <div className={style.contents}>
          {blogList.map((listItem, index) => {
            return (
              <div key={index} className={style.listItem}>
                <div className={style.listInfo}>
                  <h1 className={style.listTitle}>{listItem.title}</h1>
                  <span className={style.listDate}>🗓️ {listItem.date}</span>
                </div>
                <p className={style.listContents}>{listItem.contents}</p>
                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  <Button
                    text="글 삭제"
                    index={index}
                    blogList={blogList}
                    KEY={KEY}
                    deleteFn={setBlogList}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={style.contents}>
          <hr />
          <h1
            style={{
              paddingTop: "30px",
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            작성된 글이 없습니다.
          </h1>
        </div>
      )}
    </div>
  );
};

export default Home;
