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
import TweetInFeed from "../components/TweetInFeed.js"
import {BigNumber, ethers} from "ethers";
import Tweets from "../contractsABis/Tweets.json";
//profile为接收的参数
const DownloadLog = () => {

    const [downloadArr,setDownloadArr] = useState();
    const {Moralis,account} = useMoralis();
    const user = Moralis.User.current();
    // const [isDown,setIsDown] = useState();
    useEffect(()=>{
        async function getDownloads(){

            try {
                console.log(user);
                const Download = new Moralis.Object.extend("Download");
                const query = new Moralis.Query(Download);
                // if(profile.profile){
                query.equalTo("downloadAddress",user.attributes.accounts[0]);

                // }
                const results = await query.find();
                setDownloadArr(results);
            }catch (e) {
                console.log(e);
            }
        }
        getDownloads();
        // setIsDown(false);
    },[TweetInFeed]);

    const getD = async (e) => {
        if(e.attributes.uploaderFileTxt){
            window.open(e.attributes.uploaderFileTxt,"_blank");
        }else{
            alert("没有附件")
        }


    }
    return (
        <>
            <div style={{height:'800px',overflow:'auto'}}>
            {downloadArr?.map((e,index)=>{
                return (
                    <div className="feedTweet" key={index} >
                        <img src={e.attributes.uploaderPfp ? e.attributes.uploaderPfp :defaultImgs[0]} className="profilePic"></img>
                        {/*<a href="https://ipfs.moralis.io:2053/ipfs/QmZ29GxAwnXuSsXMpuHuU48rfqtT1MUMt5Ed4dKwjzsi94">地址</a>*/}
                        <div className="completeTweet">
                            <div className="who">
                                {/*{String(e.attributes.uploaderUserName).slice(0,10)}*/}
                                {e.attributes.uploaderUsername.substr(0,10)}
                                <div className="accWhen">
                                    {
                                        `${e.attributes.uploaderAddress.slice(0,4)}...${e.attributes.uploaderAddress.slice(38)}
                                         ${e.attributes.createdAt.toLocaleString('en-us',{month:'short'})}
                                         ${e.attributes.createdAt.toLocaleString('en-us',{day:'numeric'})}
                                         `
                                    }
                                </div>
                            </div>
                            <div className="tweetContent">
                                {e.attributes.uploaderTxt}
                                {e.attributes.uploaderImg&&(
                                    <img
                                        src={e.attributes.uploaderImg}
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
            </div>
        </>
    );
};

export default DownloadLog;

