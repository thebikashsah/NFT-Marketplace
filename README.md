NFT Market Place is a Web 3 platform, where you can Mint Your Own NFT, Buy and Sell NFT using only BharatToken.

Usecase of BharatToken.

Website:
https://sgenc-laaaa-aaaal-qcbea-cai.icp0.io/

Github:
https://github.com/thebikashsah/Bharat-Token


- Future Improvement
    
    I want to add more features like, Trending Page for Top Selling NFTs, good UI etc.


- Design
    
    ```cpp
    NFT Class Actor:
    
    	APIs:
    
    	 getCanisterId: () -> (principal) query;
       getContent: () -> (vec nat8) query;
       getName: () -> (text) query;
       getOwner: () -> (principal) query;
    	 buyPrice: () -> (text) query;
    	 ListedPrice: () -> (text) query;
    
     Data Structure:
    	
    	NFTs Content which is a Image Content was stored in BLOB Format(Binary Large Objects).
    ```
    
    ```cpp
    Main Backend Actor:
    
     APIs:
    
    	getOwnedNFTs: (principal) -> (vec principal) query;
      mint: (vec nat8, text) -> (principal);   
    	transfer : (principal, principal, principal ) -> (text);
    	
    	buy: (principal, principal, principal ) -> (text);
    	sell: (principal, principal, principal ) -> (text);
    	
    
    Data Structure:
    	
    	Map< Principal: Owners, List < Principal : NFTs > > ownerShip;
    	Map< Map< Principal: Owners, List < Principal : NFTs > > > platForm;
    
    When a NFT was Sold by a User: Ownership of the NFT was transferred from the User to the Platform.
    ```