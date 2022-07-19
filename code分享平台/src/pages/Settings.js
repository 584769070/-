import React from "react";
import './Settings.css';
import {Input} from "web3uikit";
import { defaultImgs } from "../defaultimgs";
import { useState, useRef} from "react";
import pfp1 from "../images/pfp1.png";
import pfp2 from "../images/pfp2.png";
import pfp3 from "../images/pfp3.png";
import pfp4 from "../images/pfp4.png";
import pfp5 from "../images/pfp5.png";
import {useMoralis} from "react-moralis";


const Settings = () => {
  const {Moralis,account,}  = useMoralis();
  const [selectedPFP, setSelectedPFP] = useState();
  const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
  const [theFile, setTheFile] = useState();
  const inputFile = useRef(null);
  //个人信息
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const pfps = [pfp1,pfp2,pfp3,pfp4,pfp5];

  const onBannerClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  const saveEdits = async () => {
    //引入Moralis数据库中的表
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();
    console.log(myDetails);
    if(bio){
      myDetails.set("bio",bio);
    }
    if(username) {
      myDetails.set("username",username);
    }
    if(selectedPFP){
      myDetails.set("pfp",selectedPFP);

      const Tweets = new Moralis.Object.extend("Tweets");
      const query = new Moralis.Query(Tweets);
      // let TweetsFilter = [{filter: {"tweeterAcc" : account}, update:{ "tweeterPfp" : selectedPFP}}];
      // Moralis.bulkUpdateMany("Tweets",TweetsFilter);

      query.equalTo("tweeterAcc",account);
      const results = await query.find();
      for(let i = 0; i < results.length ;i++){
        // results[i].attributes.tweeterPfp = selectedPFP;
        // console.log(results[i].attributes.tweeterPfp);
        results[i].set("tweeterPfp",selectedPFP);
        // await results.save();
        await results[i].save();
      }


      const Download = new Moralis.Object.extend("Download");
      const query1 = new Moralis.Query(Download);
      // let TweetsFilter = [{filter: {"tweeterAcc" : account}, update:{ "tweeterPfp" : selectedPFP}}];
      // Moralis.bulkUpdateMany("Tweets",TweetsFilter);

      query1.equalTo("uploaderAddress",account);
      const results1 = await query1.find();
      for(let i = 0; i < results1.length ;i++){
        // results[i].attributes.tweeterPfp = selectedPFP;
        // console.log(results[i].attributes.tweeterPfp);
        results1[i].set("uploaderPfp",selectedPFP);
        // await results.save();
        await results1[i].save();
      }
      // results.set("tweeterPfp",selectedPFP);
      console.log(results);

    }
    if(theFile){
        const data = theFile;
        const file = new Moralis.File(data.name,data);
        await file.saveIPFS();
        myDetails.set("banner",file.ipfs());
    }
    await myDetails.save();
    window.location.reload();
  }

  return (
    <>
      <div className="pageIdentify">Settings</div>

      <div className="settingsPage">
        <Input
          label="Name"
          name="NameChange"
          width="100%"
          labelBgColor="#141d26"
          value="name"
          onChange={(e)=> setUsername(e.target.value)}
        />

        <Input
          label="Bio"
          name="bioChange"
          width="100%"
          labelBgColor="#141d26"
          value="Coding with Filecoin"
          onChange={(e) => setBio(e.target.value)}
        />

        <div className="pfp">
          Profile Image (Your NFTs)
          <div className="pfpOptions">
            {
              pfps.map((e,i)=>{
                return(
                <>
                  <img src={e}
                       key={i}
                      className={selectedPFP === e ? "pfpOptionSelected":"pfpOption"}
                      onClick={()=>setSelectedPFP(pfps[i])}>
                  </img>
                </>
                )
              })
            }
          </div>
        </div>

        <div className="pfp">
          Profile Banner
          <div className="pfpOptions">
            <img
              src={selectedFile}
              onClick={onBannerClick}
              className="banner"
            ></img>
            <input
              type="file"
              name="file"
              ref={inputFile}
              onChange={changeHandler}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="save" onClick={()=>saveEdits()}>
          Save
        </div>

      </div>

    </>
  );
};

export default Settings;

