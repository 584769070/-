// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Tweets{
    address public owner;
    uint private counter;

    constructor(){
        counter = 0;
        owner = msg.sender;
    }
    struct tweet{
        address tweeter;
        uint id;
        string tweetText;
        string tweetImg;
        string fileUrl;
    }

    event tweetPublished(
        address tweeter,
        uint id,
        string tweetText,
        string tweetImg,
        string fileUrl
    );
    event getCounter(uint id);

    mapping(uint256 => tweet) tweets;

    function getTweet(uint256 id)public view returns(string memory,string memory,string memory,address){
        require(id < counter,"No such tweet");
        tweet storage item = tweets[id];
        return (item.tweetText, item.tweetImg,item.fileUrl,item.tweeter);

    }
    function addTweet(string memory text,string memory img,string memory fileUrl)public payable{
        require(msg.value == (0.1 ether),"please give money");
        tweet storage newTweet = tweets[counter];
        newTweet.tweetText = text;
        newTweet.tweetImg = img;
        newTweet.tweeter = msg.sender;
        newTweet.id = counter;
        newTweet.fileUrl = fileUrl;

        emit tweetPublished(msg.sender,counter,text,img,fileUrl);
        counter++;
        //        把钱转给owner
        payable(owner).transfer(msg.value);


    }
    function getdata() public {
        emit getCounter(counter);
    }
}
