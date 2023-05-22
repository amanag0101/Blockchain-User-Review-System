// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

contract Review {
    string public name = "Review";
    // store post
    uint256 public postCount = 0;
    mapping(uint256 => Post) public posts;

    struct Image {
        string hash;
    }

    struct Post {
        uint256 id;
        string productName;
        string productLink;
        uint256 price;
        uint256 rating;
        string reviewTitle;
        string review;
        Image image;
        address payable author;
    }

    event PostCreated(
        uint256 id,
        string productName,
        string productLink,
        uint256 price,
        uint256 rating,
        string reviewTitle,
        string review,
        Image image,
        address payable author
    );

    // create post
    function uploadPost(
        string memory _imgHash,
        string memory productName,
        string memory _productLink,
        uint256 _price,
        string memory _reviewTitle,
        uint256 _rating,
        string memory _review
    ) public {
        // make sure the image hash exists
        require(bytes(_imgHash).length > 0);
        // make sure the review exists
        require(bytes(_review).length > 0);
        // make sure the uploader address exists
        require(msg.sender != address(0));

        posts[++postCount] = Post(
            postCount,
            productName,
            _productLink,
            _price,
            _rating,
            _reviewTitle,
            _review,
            Image(_imgHash),
            payable(msg.sender)
        );

        // emit PostCreated(
        //     postCount,
        //     productName,
        //     _productLink,
        //     _price,
        //     _rating,
        //     _reviewTitle,
        //     _review,
        //     Image(_imgHash, _imageDescription),
        //     payable(msg.sender)
        // );
    }
}
