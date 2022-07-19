import React from "react";
import "./Home.css";
import { useState, useRef} from "react";
import { defaultImgs } from "../defaultimgs";
import {TextArea, Icon,Input} from "web3uikit";
import TweetInFeed from "../components/TweetInFeed";
import {useMoralis,useWeb3ExecuteFunction} from "react-moralis";
import Tweets from "../contractsABis/Tweets.json"
// import Tweets2 from "../ABI/Tweets.json"
import {ethers,BigNumber} from "ethers";
const Home = () => {
  const inputFile = useRef(null);
  const inputFileTxt = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState();
  //设置文件
  const [theTxt, setTheTxt] = useState();
  const[txtName,setTxtName] = useState();

  const{Moralis}  = useMoralis();
  const user = Moralis.User.current();
  //引入只能合约类
  const contractProcessor = useWeb3ExecuteFunction()
    //引入ethers
    // const ethers = Moralis.web3Library;

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };
   const onFileTxtClick = ()=>{
       inputFileTxt.current.click();
   }
  const changeFileHandler = (event) =>{
      const file = event.target.files[0];
      setTheTxt(file);
      setTxtName(file.name)
      console.log(file.name);
  }

  async function saveTweet(id) {
      if(!tweet) return ;
      //得到
      const Tweets = Moralis.Object.extend("Tweets");
      //新建一条数据
      const newTweet = new Tweets();
      //添加tweetID
      newTweet.set("tweetId",id);
      newTweet.set("tweetTxt",tweet);
      newTweet.set("tweeterPfp",user.attributes.pfp);
      newTweet.set("tweeterAcc",user.attributes.ethAddress);
      newTweet.set("tweeterUserName",user.attributes.username);
      if(theFile){
          const data = theFile;
          const file = new Moralis.File(data.name,data);
          await file.saveIPFS();
          newTweet.set("tweetImg",file.ipfs());
      }
      if(theTxt){
          const txt = theTxt;
          const fileTxt = new Moralis.File(txt.name,txt);
          await fileTxt.saveIPFS();
          newTweet.set("tweetFileTxt",fileTxt.ipfs());
      }

      await newTweet.save();
      window.location.reload();
  }

  async function maticTweet() {
      if(!tweet){
          return ;
      }
      let img;
      if(theFile){
          const data = theFile;
          const file = new Moralis.File(data.name,data);
          await file.saveIPFS();
          img = file.ipfs();
          // newTweet.set("tweetImg",file.ipfs());
      }else{
          img = "no img"
      }
      //设置智能合约函数的参数
      let options={
          contractAddress: "0x1320228144E033C5D7FACeE0e756785ebaECcD18",
          functionName: "addTweet",
          abi:Tweets.abi,
          params:{
              text:tweet,
              img:img,
          },
          msgValue: Moralis.Units.ETH(0.1)

      }
      const result = await contractProcessor.fetch({
          params:options,
          onSuccess:()=>{
              saveTweet();
          },
          onError:(error)=>{
                console.log(error);
          }
      })
      // result.data()
      // console.log(result);
      alert(JSON.stringify(result))



  }
  async function ethersSave() {
      console.log(111111111);
      if(!tweet){
          return ;
      }
      let img;
      if(theFile){
          const data = theFile;
          const file = new Moralis.File(data.name,data);
          await file.saveIPFS();
          img = file.ipfs();
          // newTweet.set("tweetImg",file.ipfs());
      }else{
          img = "no img"
      }
      let text;
      if(theTxt){
          const txtData = theTxt;
          const fileTxt = new Moralis.File(txtData.name,txtData);
          await fileTxt.saveIPFS();
          // newTweet.set("tweetFileTxt",fileTxt.ipfs());
          text = fileTxt.ipfs();
      }else{
          text = "no files"
      }
      //智能合约地址
      const contractAddress = "0xC213135Be24e8Aca787cE5ba8bfB82F9049A27Ae";
      //存储提供者
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      //获取签名
      const signer = provider.getSigner();
      try{
          const contract =  new ethers.Contract(contractAddress,Tweets.abi,signer);
          const options = {value: ethers.utils.parseEther("0.1")};
          console.log(contract);
          console.log(contractAddress);
          let tx = await contract.addTweet(tweet,img,text,options);
          // let tx = await contract.getdata();
          // // let tx = await contract.methods.uploadFile(rootCid,str,options);
          // console.log(tx);
          let rc = await tx.wait();
          let BigNumberFileIdHex = rc.events[0].args["id"]._hex;
          let tmp_id = BigNumber.from(BigNumberFileIdHex).toNumber();
              // // let BigNumberFileIdHex = rc.events[0].args["id"]._hex;
          // // let str = rc.events[0].args["tweetText"];
          console.log(rc);
          alert("上传成功！");
          await saveTweet(tmp_id);
      }catch (e) {
          console.log("上传失败！");
      }


      // // saveTweet();
  }

  return (
    <>
    <div className="pageIdentify">Home</div>
      <div className="mainContent">
        <div className="profileTweet">
          <img
            src={user.attributes.pfp?user.attributes.pfp:defaultImgs[0]} className="profilePic" >
          </img>

          <div className="tweetBox">
            <TextArea
                state="confirmed"
              label=""
              placeholder="Type here field"
              name="tweetTextArea"
              onBlur={function noRefCheck(){}}
              type="text"
              width="95%"
              onChange={(e) => setTweet(e.target.value)}>
            </TextArea>
            {selectedFile && (
              <img src={selectedFile} className="tweetImg"></img>
            )}

            <div className="imgOrTweet">
              <div className="imgDiv" onClick={onImageClick}>
                <input
                    type="file"
                    name="file"
                    ref={inputFile}
                    onChange={changeHandler}
                    style={{ display: "none"}}
                  />
                  <Icon fill="#1DA1F2" size={20} svg="image"></Icon>

              </div>
                <div className="fileTxt" onClick={onFileTxtClick}>
                    <input
                        type="file"
                        name="fileTxt"
                        ref={inputFileTxt}
                        onChange={changeFileHandler}
                        style={{ display: "none"}}
                    />
                    {/*<Input*/}
                    {/*    // label="Label text"*/}
                    {/*    name="Test text Input"*/}
                    {/*    value={txtName}*/}
                    {/*    // placeholder="请选择一个文件"*/}
                    {/*/>*/}
                    <input
                        value={txtName}
                        placeholder="上传附件"
                    />

                    {/*<div>*/}
                    {/*    {theTxt?theTxt:"请选择一个文件"}*/}
                    {/*</div>*/}
                    <Icon
                        fill="#2E7DAF"
                        size={24}
                        svg="mail"
                    />
                </div>


              <div className="tweetOptions">
                  <div className="tweet" onClick={ethersSave}>Ethers</div>
                  {/*<div className="tweet" onClick={saveTweet}>Tweet</div>*/}
                {/*  <div className="tweet" onClick={maticTweet} style={{ backgroundColor: "#8247e5" }}>*/}
                {/*    <Icon fill="#ffffff" size={20} svg="matic" />*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
        <TweetInFeed profile={false}/>
      </div>
    </>
  );
};

export default Home;
