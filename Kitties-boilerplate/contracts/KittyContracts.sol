pragma solidity ^0.5.12;
import "./IERC721.sol";
import "./Ownable.sol";
import "./IERC721Receiver.sol";
contract Kittycontract is IERC721,Ownable{

    uint256 public constant CREATION_LIMIT_GEN0 = 10; 
    string public constant name="Amity_kitties";
    string public constant symbol="AK";
    bytes4 internal constant MAGIC_ERC721_RECEIEVED= bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    event Birth //now the website can know when the birth of a new kitten happens
    (
        address owner, 
        uint256 kittenId,
        uint256 mumId, 
        uint256 dadId,
        uint256 genes
    );

    struct Kitty{
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }
    Kitty[] kitties;

    mapping(uint256=> address) public kittyIndexToOwner;
    mapping(address => uint256) ownershipTokenCount;
    mapping(uint256 => address) public kittyIndexToApproved; 
    //give approval to someone else also to transfer token..transferring rights..behalf of someone else
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    mapping(address => uint) balance;
    //MYADDR => OpearatorAddr => True/False
    // ---------------------------------
        function breed(uint256 _dadId, uint256 _mumId) public returns(uint256)
        {
            require(_owns(msg.sender,_dadId), "The User does not own this token");
            require(_owns(msg.sender,_mumId), "The user doesn't own the token");
            //Check Ownership
            //You got the dna
            //Figure out the generation
            //Create a new cat with the new properties and give it to msg.sender
            uint256 newDna =  _mixDna(_dadId,_mumId);
        }
    
    // --------------------------------
    function supportsInterface(bytes4 _interfaceId) external returns (bool)
    {
        return (_interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165);
    }

    // -----------------------------------------------------------
    function safeTransferFrom(address _from,address _to, uint256 _tokenId) public{
        safeTransferFrom(_from, _to, _tokenId, "");
        //we call the safetransferfrom but with data as an empty string
    }
    //---------------------------------------------------------------------
    function safeTransferFrom(address _from,address _to,uint256 _tokenId,bytes memory _data) public {
        require(_isApprovedOrOwner(msg.sender,_from,_to,_tokenId),"In1");
        _safeTransfer(_from, _to, _tokenId, _data);
    }
    // ------------------------------------------------------------------
    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal
    {
        _transfer(_from,_to,_tokenId);
        require(_checkERC721Support(_from,_to,_tokenId,_data),"In2");

    }
    // --------------------------------------------------------
    // ---------------------------------------------
    function transferFrom(address _from,address  _to,uint256 _tokenId) public
    {
        require(_to != address(0)); //cannot send to zero address
        require(msg.sender == _from || _approvedFor(msg.sender,_tokenId) || isApprovedForAll(_from,msg.sender));
        //either the msg.sender is the from address  or msg.sender is an approved address for the token or msg.sender has approval for all the tokens of _from
        require(_owns(_from,_tokenId));
        //fromaddress actually owns this tokenId
        require(_tokenId < kitties.length);
        
        _transfer(_from,_to,_tokenId);
    }
    function approve(address _to,uint256 _tokenId) public 
    {
        //give approval for one specific tokenId 
        require(_owns(msg.sender, _tokenId),"In3");

        _approve(_tokenId,_to); //internal approve func
        emit Approval(msg.sender, _to, _tokenId); //emit the approval
    }
    function setApprovalForAll(address operator, bool approved) public
    {
        require(operator != msg.sender);
        _operatorApprovals[msg.sender][operator] = approved; //true/false
        emit ApprovalForAll(msg.sender, operator, approved); //we can set and withdraw approval
    }
    function getApproved(uint256 tokenId) public view returns(address)
    {
        //get the status of a specif token approval
        require(tokenId < kitties.length,"In4"); //Token must exist..If the tokenId is not a valid toke..now all our tokens will be in the kitties array..[0,1,2,3,4]//so length will be 5..now 5 will not be approved coz it's not "<"
        return kittyIndexToApproved[tokenId]; //returns address of the tokenId that has approval
    }
    function isApprovedForAll(address owner, address operator) public view returns(bool)
    {
        //getter for isApprovedForAll..here we get the bool back i.e., either true or false..if a specific operator is an approved operator for this specific owner  
        return _operatorApprovals[owner][operator];
    }
    //both Gen0 and Breeding will use this internal function CreateKitty
    function  _createKitty(
        uint256 _mumId,
        uint256 _dadId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    )private returns (uint256){
        Kitty memory _kitty = Kitty({
            genes: _genes,
            birthTime: uint64(now),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });
        uint256 newKittenId = kitties.push(_kitty) - 1;
         //from this push function..it will return the size of the array
        //now for transfer we are using an internal transfer function

        emit Birth(_owner,newKittenId,_mumId,_dadId,_genes);

        _transfer(address(0), _owner, newKittenId);
        //address full of 0's to owner and ownership of newKittenId

        return(newKittenId);
    }
    //function to add new gen0 cats
    uint256 public gen0Counter; //count how many gen0 cats wehave created
    function createKittyGen0(uint256 _genes) public onlyOwner returns(uint256){
        //This will take the genes that we send in from the front end when we create the cat..using that the sliders and gen0 should use the private kitty function
        

        require(gen0Counter < CREATION_LIMIT_GEN0,"In5");

        gen0Counter++;
        return _createKitty(0, 0, 0, _genes,msg.sender);

    }
    // -------------------------------------------------------
 
    // -------------------------------------------------
    function getKittyByOwner(address _owner) external view returns(uint[] memory)
    {
        uint[] memory result = new uint[](ownershipTokenCount[_owner]);
        uint counter = 0;
        for (uint i=0; i<kitties.length;i++)
        {
            if(kittyIndexToOwner[i] == _owner)
            {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
    // ----------------------------------
    function getKitty(uint256 _id) public view returns (
        uint256 genes,
        uint256 birthTime,
        uint256 mumId,
        uint256 dadId,
        uint256 generation

    )
    {
       Kitty storage kitty = kitties[_id]; //why storage so it will take less spce...we say that this cat is in memory and we just need the pointer to it
       
       birthTime = uint256(kitty.birthTime); //256 is way easier to read in the front end
       mumId = uint256(kitty.mumId);
       dadId = uint256(kitty.dadId);
       generation = uint256(kitty.generation);
       genes = kitty.genes;

    }
    function balanceOf(address owner) external view returns (uint256 balance){
        return ownershipTokenCount[owner];
    }

    function totalSupply() external view returns (uint256 total){
        return kitties.length;
    }
    function ownerOf(uint256 _tokenId) external view returns (address owner){
        return kittyIndexToOwner[_tokenId];
    }
    function transfer(address _to, uint256 _tokenId) external{
        require(_to !=address(0),"In6");
        require(_to !=address(this),"In7");
        require(_owns(msg.sender,_tokenId),"In8");

        _transfer(msg.sender, _to, _tokenId);
    }
    function _transfer(address _from, address _to, uint256 _tokenId) internal{
        ownershipTokenCount[_to]++;
        kittyIndexToOwner[_tokenId]=_to;
        if(_from !=address(0)){
            ownershipTokenCount[_from]--;
            delete kittyIndexToApproved[_tokenId];
        }
        emit Transfer(_from,_to,_tokenId);
    } 
    function _owns(address _claimant,uint256 _tokenId) internal view returns(bool){
        return kittyIndexToOwner[_tokenId]==_claimant;
    }

    function _approve(uint256 _tokenId,address _approved) internal
    {
        kittyIndexToApproved[_tokenId] = _approved;
    }
    function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool)
    {
        return kittyIndexToApproved[_tokenId] == _claimant;
        //if they have approval then true or else false
    }
    function _checkERC721Support(address _from, address _to, uint256 _tokenId,bytes memory _data) internal returns(bool)
    {
        if(!_isContract(_to))
        {
            return true;
        }

        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender,_from,_tokenId,_data); //This is going to let us call a function to this _to by defining the function header that we need for onERC721Receieved

        //If it is a contract then we have to execute onERC721Receievd in _to contract. Then we have to check the return value
        return returnData == MAGIC_ERC721_RECEIEVED;

    }
    function _isContract(address _to) view internal returns (bool)
    {
        uint32 size;
        assembly{
            size := extcodesize(_to)
        }
        return size > 0; //it is a contract if size is grater than 0
    }
    function _isApprovedOrOwner(address _spender, address _from, address _to,uint256 _tokenId) internal view returns(bool)
    {
        require(_tokenId<kitties.length,"In9"); //Token must exist
        require(_to != address(0),"In10"); //To address is not 0 addess
        require(_owns(_from,_tokenId),"In11"); //From owns the token

        //_spender is from OR spender is approved for tokenId or spender is operator for from
        return(_spender == _from || _approvedFor(_spender,_tokenId) || isApprovedForAll(_from,_spender));
    }


    function _mixDna(uint256 _dadDna, uint256 _mumDna) internal returns (uint256)
    {
        //Basic DNA Mixing
        //dadDna: 11 22 33 44 55 66 77 88
        //mumDna: 88 77 66 55 44 33 22 11
        uint256 firstHalf = _dadDna / 100000000; //11 22 33 44
        uint256 secondHalf = _mumDna % 100000000;// 44 33 22 11
        //10 + 20
        //10 * 100 = 1000
        //1000 + 20 =1020

        uint256 newDna = (firstHalf * 100000000);
        newDna = newDna + secondHalf;
        return newDna;

        //FinalDna = 11 22 33 44  44 33 22 11

    }
}