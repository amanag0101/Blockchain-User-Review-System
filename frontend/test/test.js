const { assert } = require('chai')
const Review = artifacts.require('./Review.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

// three account present in the testing scenario (deployer, author, tipper)
contract('Review', ([deployer, author, tipper]) => {
  let review;

  before(async () => {
    review = await Review.deployed();
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await review.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    })

    it('has a name', async () => {
      const name = await review.name();
      assert.equal(name, 'Review');
    });
  });

  describe("posts", async () => {
    let result, postCount;
    const hash = "abc123";

    before(async () => {
      // here {from: author} is the meta-data
      // it tells solidity who the function caller is (author in this case i.e msg.sender)
      result = await review.uploadPost(hash, "Image description", "first review", {from: author});
      postCount = await review.postCount();
    });


    it("create posts", async () => {
      // success
      const event = result.logs[0].args;
      assert.equal(postCount, 1);
      assert.equal(event.id.toNumber(), postCount.toNumber(), "id is correct");
      assert.equal(event.image.hash, hash, "hash is correct");
      assert.equal(event.image.description, "Image description", "description is correct");
      assert.equal(event.review, "first review", "review is correct");
      assert.equal(event.author, author, "author is correct");

      // failure: image mush have hash
      await review.uploadPost("", "Image description", "first review", {from: author}).should.be.rejected;

      // failure: image mush have description
      await review.uploadPost("abc123", "", "first review", {from: author}).should.be.rejected;

      // failure: post mush have a review
      await review.uploadPost("abc123", "image description", "", {from: author}).should.be.rejected;
    });

    // check from struct
    it("lists posts", async () => {
      const post = await review.posts(postCount);
      assert.equal(post.id.toNumber() + 1, postCount.toNumber(), "id is correct");
      assert.equal(post.image.hash, hash, "hash is correct");
      assert.equal(post.image.description, "Image description", "description is correct");
      assert.equal(post.review, "first review", "review is correct");
      assert.equal(post.author, author, "author is correct");
    });
  });
});