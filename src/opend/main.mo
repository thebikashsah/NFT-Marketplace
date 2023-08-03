import Principal "mo:base/Principal";
import Nat8 "mo:base/Nat8";
import NFTActorClass "../NFT/nft";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import List "mo:base/List";



actor OpenD {

    var mapOfNFTs = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);
    var mapOfOwners = HashMap.HashMap<Principal, List.List<Principal>> (1, Principal.equal, Principal.hash);


    public shared(msg) func mint(imgData: [Nat8], name: Text) : async Principal{
        let owner: Principal = msg.caller;
        
        Debug.print("Main balance: " # debug_show(Cycles.balance()));
        Cycles.add(100_500_000_000);
        let newNFT = await NFTActorClass.NFT(name, owner, imgData);
        Debug.print("Main balance: " # debug_show(Cycles.balance()));

        let newNFTPrincipal = await newNFT.getCanisterId();


        mapOfNFTs.put(newNFTPrincipal,newNFT);
        addToOwner(owner, newNFTPrincipal);

        return newNFTPrincipal;
    };

    private func addToOwner(owner: Principal, nftId: Principal){

        var ownedNFT: List.List<Principal> = switch(mapOfOwners.get(owner)) {
            case null List.nil<Principal>();
            case (?result) result;
        };

        ownedNFT:= List.push(nftId, ownedNFT);

        mapOfOwners.put(owner, ownedNFT);

    };

    public query func getOwnedNFTs(user: Principal): async [Principal] {

        var userNFT: List.List<Principal> = switch(mapOfOwners.get(user)) {
            case null List.nil<Principal>();
            case (?result) result;
        };

        return List.toArray(userNFT);
    };
 
};
