import React, {useEffect,useState} from "react";
import "./TweetInFeed.css";
import filecoinOrbit from "../images/filecoinOrbit.jpeg";
import canoe from "../images/canoe.jpeg";
import { defaultImgs } from "../defaultimgs";
import pfp4 from "../images/pfp4.png";
import pfp5 from "../images/pfp5.png";
import { Icon ,Button} from "web3uikit";
import {useMoralis} from "react-moralis";
import Profile from "../pages/Profile.js";
import {BigNumber, ethers} from "ethers";
import Tweets from "../contractsABis/Tweets.json";
// import TweetInFeed from "../components/TweetInFeed.js"
//profile为接收的参数
const TweetInFeed = (profile) => {

  const [tweetAtr,setTweetAtr] = useState();
  const {Moralis,account} = useMoralis();
  const user = Moralis.User.current();
  useEffect(()=>{
    async function getTweets(){
      try {
        const Tweets = new Moralis.Object.extend("Tweets");
        const query = new Moralis.Query(Tweets);
        if(profile.profile){
          console.log("值为==="+profile.profile);
          query.equalTo("tweeterAcc",user.attributes.accounts[0]);
        }
        const results = await query.find();
        // alert(results.length)
        setTweetAtr(results);
      }catch (e) {
        console.log(e);
      }
    }
    getTweets();
  },[Profile]);

  async function saveDownload(e) {
    // if(!tweet) return ;
    //得到
    let flag = false;
    const Download = new Moralis.Object.extend("Download");
    const query = new Moralis.Query(Download);
    query.equalTo("downloadAddress",user.attributes.accounts[0]);
    const ans = await query.find();
    console.log(ans);
    for(let i = 0;i < ans.length;i++){
      if(ans[i].attributes.downloadId === e.attributes.tweetId){
        flag = true;
        break;
      }
    }
    // const final_query = query.equalTo("downloadId",e.attributes.tweetId);
    // const final_ans = await final_query.find();
    // console.log(final_ans.length);
    if(flag){
      console.log("已存在！");
    }
    else {
      //新建一条数据
      const newDownload = new Download();
      newDownload.set("downloadAddress",user.attributes.accounts[0]);
      newDownload.set("downloadId",e.attributes.tweetId);
      newDownload.set("uploaderTxt",e.attributes.tweetTxt)
      newDownload.set("uploaderAddress",e.attributes.tweeterAcc);
      newDownload.set("uploaderPfp",e.attributes.tweeterPfp);
      newDownload.set("uploaderUsername",e.attributes.tweeterUserName);
      newDownload.set("uploaderImg",e.attributes.tweetImg);
      newDownload.set("uploaderFileTxt",e.attributes.tweetFileTxt);
      await newDownload.save();
      // window.location.reload();
    }

  }

  const getD = async (e) => {
    if(e.attributes.tweetFileTxt){
      await saveDownload(e);
      window.open(e.attributes.tweetFileTxt,"_blank");
    }else{
      await saveDownload(e);
      alert("没有附件")
    }
    window.location.reload();


    //智能合约地址
    // const contractAddress = "0xC213135Be24e8Aca787cE5ba8bfB82F9049A27Ae";
    // //存储提供者
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    //
    // //获取签名
    // const signer = provider.getSigner();
    // try{
    //   const contract =  new ethers.Contract(contractAddress,Tweets.abi,signer);
    //   // const options = {value: ethers.utils.parseEther("0.1")};
    //   console.log(contract);
    //   console.log(contractAddress);
    //   // let tx = await contract.addTweet(tweet,img,options);
    //   let tx = await contract.getTweet(e.attributes.tweetId);
    //   // let tx = await contract.getdata();
    //   // // let tx = await contract.methods.uploadFile(rootCid,str,options);
    //   console.log(tx);
    //   // let rc = await tx.wait();
    //   // let BigNumberFileIdHex = rc.events[0].args["id"]._hex;
    //   // let tmp_id = BigNumber.from(BigNumberFileIdHex).toNumber();
    //   // // let BigNumberFileIdHex = rc.events[0].args["id"]._hex;
    //   // // let str = rc.events[0].args["tweetText"];
    //   // console.log(rc);
    //   // setIsDown(true);
    //   if(e.attributes.tweetFileTxt){
    //     window.open(e.attributes.tweetFileTxt,"_blank");
    //   }else{
    //     alert("没有附件")
    //   }
    //   // alert("获取成功！");
    //
    //   // await saveTweet(tmp_id);
    // }catch (e) {
    //   console.log(e);
    // }

  }
  return (
    <>
      {tweetAtr?.map((e,index)=>{
        return (
            <div className="feedTweet" key={index}>
              <img src={e.attributes.tweeterPfp ? e.attributes.tweeterPfp :defaultImgs[0]} className="profilePic"></img>
              {/*<a href="https://ipfs.moralis.io:2053/ipfs/QmZ29GxAwnXuSsXMpuHuU48rfqtT1MUMt5Ed4dKwjzsi94">地址</a>*/}
              <div className="completeTweet">
                <div className="who">
                  {e.attributes.tweeterUserName.slice(0,10)}
                    <div className="accWhen">
                      {
                        `${e.attributes.tweeterAcc.slice(0,4)}...${e.attributes.tweeterAcc.slice(38)}
                         ${e.attributes.createdAt.toLocaleString('en-us',{month:'short'})}
                         ${e.attributes.createdAt.toLocaleString('en-us',{day:'numeric'})}
                        `
                      }
                    </div>
                </div>
                <div className="tweetContent">
                  {e.attributes.tweetTxt}
                  {e.attributes.tweetImg&&(
                      <img
                          src={e.attributes.tweetImg}
                          className="tweetImg">
                      </img>
                  )}
                </div>
                <div className="interactions">
                  {/*<div className="interactionNums">*/}
                  {/*  <Icon fill="#3f3f3f" size={20} svg="messageCircle" />*/}
                  {/*</div>*/}
                  {/*<div className="interactionNums">*/}
                  {/*  <Icon fill="#3f3f3f" size={20} svg="star" />*/}
                  {/*  12*/}
                  {/*</div>*/}
                  {/*<div className="interactionNums">*/}
                  {/*  <Icon fill="#3f3f3f" size={20} svg="matic" />*/}
                  {/*</div>*/}
                  <Button
                      id="test-button-primary"
                      onClick={getD.bind(this,e)}
                      text="点击查看附件"
                      theme="primary"
                      type="button"
                      size="small"
                  />
                  {/*{isDown && <a href={e.attributes.tweetFileTxt} target="_blank">百度一下</a>}*/}
                </div>
              </div>
            </div>
        )
      }).reverse()
      }
    {/*<div className="feedTweet">*/}
    {/*    <img src={pfp5} className="profilePic"></img>*/}
    {/*    <div className="completeTweet">*/}
    {/*      <div className="who">*/}
    {/*        Filecoin*/}
    {/*        <div className="accWhen">0x42..314 · 1h</div>*/}
    {/*      </div>*/}
    {/*      <div className="tweetContent">*/}
    {/*        Excited about the Filecoin Orbit swag!*/}
    {/*        <img src={filecoinOrbit} className="tweetImg"></img>*/}
    {/*      </div>*/}
    {/*      <div className="interactions">*/}
    {/*        <div className="interactionNums">*/}
    {/*          <Icon fill="#3f3f3f" size={20} svg="messageCircle" />*/}
    {/*        </div>*/}
    {/*        <div className="interactionNums">*/}
    {/*          <Icon fill="#3f3f3f" size={20} svg="star" />*/}
    {/*          12*/}
    {/*        </div>*/}
    {/*        <div className="interactionNums">*/}
    {/*          <Icon fill="#3f3f3f" size={20} svg="matic" />*/}
    {/*        </div>*/}
    {/*      </div>*/}
    {/*    </div>*/}
    {/*  </div>*/}
    {/*  <div className="feedTweet">*/}
    {/*    <img src={pfp4} className="profilePic"></img>*/}
    {/*    <div className="completeTweet">*/}
    {/*      <div className="who">*/}
    {/*        IPFS*/}
    {/*        <div className="accWhen">0x42..314 · 1h</div>*/}
    {/*      </div>*/}
    {/*      <div className="tweetContent">*/}
    {/*        is simply dummy text of the printing and typesetting industry. Lorem*/}
    {/*        Ipsum has been the industry's standard dummy text ever since the*/}
    {/*        1500s, when an unknown printer took a galley of type and scrambled*/}
    {/*        it to make a type specimen book. It has survived not only five*/}
    {/*        centuries, but also the leap into electronic typesetting, remaining*/}
    {/*        essentially un*/}
    {/*      </div>*/}
    {/*      <div className="interactions">*/}
    {/*        <div className="interactionNums">*/}
    {/*          <Icon fill="#3f3f3f" size={20} svg="messageCircle" />*/}
    {/*        </div>*/}
    {/*        <div className="interactionNums">*/}
    {/*          <Icon fill="#3f3f3f" size={20} svg="star" />*/}
    {/*          12*/}
    {/*        </div>*/}
    {/*        <div className="interactionNums">*/}
    {/*          <Icon fill="#3f3f3f" size={20} svg="matic" />*/}
    {/*        </div>*/}
    {/*      </div>*/}
    {/*    </div>*/}
    {/*  </div>*/}
    {/*  */}
    {/*  <div className="feedTweet">*/}
    {/*    <img src={pfp5} className="profilePic"></img>*/}
    {/*    <div className="completeTweet">*/}
    {/*      <div className="who">*/}
    {/*        Filecoin*/}
    {/*        <div className="accWhen">0x42..314 · 1h</div>*/}
    {/*      </div>*/}
    {/*      <div className="tweetContent">*/}
    {/*        Thoughts on the new Coca-Cola banana 🥤🍌 flavor?*/}
    {/*      </div>*/}
    {/*      <div className="interactions">*/}
    {/*        <div className="interactionNums">*/}
    {/*          <Icon fill="#3f3f3f" size={20} svg="messageCircle" />*/}
    {/*        </div>*/}
    {/*        <div className="interactionNums">*/}
    {/*          <Icon fill="#3f3f3f" size={20} svg="star" />*/}
    {/*          12*/}
    {/*        </div>*/}
    {/*        <div className="interactionNums">*/}
    {/*          <Icon fill="#3f3f3f" size={20} svg="matic" />*/}
    {/*        </div>*/}
    {/*      </div>*/}
    {/*    </div>*/}
    {/*  </div>*/}
    {/*  <div className="feedTweet">*/}
    {/*    <img src={defaultImgs[0]} className="profilePic"></img>*/}
    {/*    <div className="completeTweet">*/}
    {/*      <div className="who">*/}
    {/*        Juhizzz*/}
    {/*        <div className="accWhen">0x42..314 · 1h</div>*/}
    {/*      </div>*/}
    {/*      <div className="tweetContent">*/}
    {/*        Love spending time on the water 🌊🌅*/}
    {/*        <img src={canoe} className="tweetImg"></img>*/}
    {/*      </div>*/}
    {/*      <div className="interactions">*/}
    {/*        <div className="interactionNums">*/}
    {/*          <Icon fill="#3f3f3f" size={20} svg="messageCircle" />*/}
    {/*        </div>*/}
    {/*        <div className="interactionNums">*/}
    {/*          <Icon fill="#3f3f3f" size={20} svg="star" />*/}
    {/*          12*/}
    {/*        </div>*/}
    {/*        <div className="interactionNums">*/}
    {/*          <Icon fill="#3f3f3f" size={20} svg="matic" />*/}
    {/*        </div>*/}
    {/*      </div>*/}
    {/*    </div>*/}
    {/*  </div>*/}
    </>
  );
};

export default TweetInFeed;

