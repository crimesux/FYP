import React from 'react'
import { useState, useEffect } from 'react'
import Option from './Option/Option';
import SearchBar from '../SearchBar/SearchBar';
import Voter from './Voter/Voter';
import { useNavigate, useLocation } from 'react-router-dom';
import CampaignService from '../../services/CampaignService';
import { useSelector } from 'react-redux/es/exports';
import UserService from '../../services/UserService';

const votersDummyData = [
    {
        id: 1,
        voterName: 'Anas'
    },
    {
        id: 2,
        voterName: 'Moiez'
    },
    {
        id: 3,
        voterName: 'Faique'
    },
    {
        id: 4,
        voterName: 'Fauji'
    },
    {
        id: 5,
        voterName: 'Abdul'
    },
    {
        id: 6,
        voterName: 'Ali'
    },
    {
        id: 7,
        voterName: 'Rizwan'
    },
    {
        id: 8,
        voterName: 'Nauman'
    },
]

export default function NewCampaignForm() {
    const location = useLocation();
    const [campaignId, setCampaignId] = useState(location.state?location.state.campainId:null);
    const [campaignName, setCampaignName] = useState(location.state?location.state.campaignName:'');
    const [campaignInfo, setCampaignInfo] = useState(location.state?location.state.campaignInfo:'');
    const [campaignMedia, setCampaignMedia] = useState(location.state?location.state.campaignMedia:'');
    const [deadline, setDeadline] = useState(location.state?location.state.deadline:'');
    const [optionsArray, setOptionsArray] = useState(location.state?location.state.options:[{ id: 1, optionName: '' }, { id: 2, optionName: '' }]);
    const [votersArray, setVotersArray] = useState(location.state?location.state.voters:[]);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [readonlyDeadline, setReadonlyDeadline] = useState(false);
    const user = useSelector(state=>state.user.user);
    const [searchData,setSearchData] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            const userData = await UserService.getAllVoters();
            // console.log(userData.data);
            setSearchData(userData.data)
        }
        fetchData();
    },[])

    const dataChangeHandler = (event) => {
        if (event.target.id === 'campaignName') {
            setCampaignName(event.target.value);
        }
        else if (event.target.id === 'campaignInfo') {
            setCampaignInfo(event.target.value);
        }
        else if (event.target.id === 'campaignMedia') {
            setCampaignMedia(event.target.value);
        }
        else if (event.target.id === 'deadline') {
            setDeadline(event.target.value);
        }
        else if (event.target.id === 'addNewOption') {
            if (optionsArray.length === 0) {
                setOptionsArray([{ id: 1, optionName: '' }])
            }
            else if (optionsArray.length > 0) {
                setOptionsArray(prev => [...prev, { id: prev[prev.length - 1].id + 1, optionName: '' }])
            }
        }
        else if (event.target.id === 'saveBtn') {
			if(campaignName === "")
			{window.confirm('Please Enter a Campaign Name');}
			else if(deadline === "")
			{window.confirm('Please Enter a Deadline');}
			else
			{
				setReadonlyDeadline(true);
				// console.log(user)
			   
				const voterData = votersArray.map((item)=>{return{user:item.id,voteStatus:"Pending"}});
				const optData = optionsArray.map((item)=>{return{optionDesc: item.optionName,voteCount:"0"}});
				console.log(voterData);
				console.log(optData);
				const campaign = {
					campaignName:campaignName,
					campaignInfo: campaignInfo,
					campaignMedia: campaignMedia,
					deadline:deadline,
					options:optData,
					voters:voterData
				}
				const userid = localStorage.getItem("inputValue");
				CampaignService.createCampaign(userid,campaign).then((res)=>{console.log(res)});
				setData({
					campaignName,
					campaignInfo, 
					campaignMedia,
					deadline,
					voters: votersArray,
					options: optionsArray
				})
				navigate("/campaigns");
				window.location.reload();
			}
		}
        else if(event.target.id === 'backBtn') {
            navigate("/campaigns");
            window.location.reload();
        }
    }
    
    const deleteOptionHandler = (id) => {
        setOptionsArray(prev => prev.filter(prevOption => prevOption.id !== id))
    }

    const setOptionNameHandler = (updatedOption) => {
        const newOptionsArray = optionsArray.map(option => {
            if (option.id === updatedOption.id) {
                return { ...option, optionName: updatedOption.optionName }
            }
            else {
                return option
            }
        });
        setOptionsArray(newOptionsArray);
    }

    const voterSelectionHandler = (voterId) => {
        const currentVoter = searchData.find(voter => parseInt(voterId) === voter.id);
        console.log(currentVoter);
        if (votersArray.length === 0) {
            setVotersArray([currentVoter])
        }
        else if (votersArray.length > 0) {
            setVotersArray(prev => [...prev, currentVoter])
        }
    }

    const removeVoterHandler = (id) => {
        setVotersArray(prev => prev.filter(prevVoter => prevVoter.id !== id))
    }

    return (
        <div className='w-100 pt-10 flex justify-center align-middle'>
            <div className='bg-slate-500 container p-10 rounded-md'>
                <form className='container'>
                    <div className="mb-3">
                        <label htmlFor="campaignName" className="form-label font-semibold">Campaign Name</label>
                        <input onChange={dataChangeHandler} type="text" className="form-control" id="campaignName" value={campaignName} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="campaignInfo" className="form-label font-semibold">Campaign Information</label>
                        <input onChange={dataChangeHandler} type="text" className="form-control" id="campaignInfo" value={campaignInfo} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="campaignMedia" className="form-label font-semibold">Campaign Media</label>
                        <input onChange={dataChangeHandler} type="text" className="form-control" id="campaignMedia" value={campaignMedia} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="deadline" className="form-label font-semibold">Deadline</label>
                        <input onChange={dataChangeHandler} type="date" className="form-control" id="deadline" value={deadline} readOnly={readonlyDeadline} />
                    </div>
                    <div className="mb-3">
                        <SearchBar
                            placeholder='Search Voter...'
                            dataToBeSearched={searchData}
                            onItemSelected={voterSelectionHandler}
                        />
                        <div className='flex align-middle gap-x-2 flex-wrap gap-y-2 my-1'>
                            {votersArray.map(voter => <Voter
                                key={voter.id}
                                id={voter.id}
                                userName={voter.userName}
                                removeVoterHandler={removeVoterHandler}
                            />)}
                        </div>

                    </div>
                    <div className='form-floating flex flex-col gap-y-1'>
                        {optionsArray.length > 0 && <label className="form-label font-semibold">Options:</label>}
                        <button type='button' className="btn btn-dark" onClick={dataChangeHandler} id='addNewOption'>Add</button>
                        <div className="flex align-middle gap-x-2 flex-wrap gap-y-2">
                            {optionsArray.map(option => <Option
                                key={option.id}
                                id={option.id}
                                deleteOptionHandler={deleteOptionHandler}
                                optionName={option.optionName}
                                setOptionNameHandler={setOptionNameHandler}
                            />)}
                        </div>
                    </div>
                    <div className='flex align-middle gap-x-2 mt-2'>
                        <button type='button' className="w-100 btn btn-dark" onClick={dataChangeHandler} id='saveBtn'>Save</button>
                        <button type='button' className="w-100 btn btn-dark" onClick={dataChangeHandler} id='backBtn'>Back</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
