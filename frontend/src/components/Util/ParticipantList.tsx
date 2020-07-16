import React from 'react';
import './ParticipantList.css';
import {useObserver} from 'mobx-react';
import ParticipantsStore from "../../stores/ParticipantsStore";
import MyInfo from "../../stores/MyInfo";
import IO from "../../controllers/IO";

interface IParticipantListProps {
    onTransfer?: () => void
}

const ParticipantList: React.FunctionComponent<IParticipantListProps> = ({onTransfer}) =>
    useObserver(() => (
        <div className={"participant-list"}>
            {
                ParticipantsStore
                    .getLiving(true)
                    .slice(2)
                    .map(participant => {
                        return (
                            <div key={participant.id} className={"participant"}>
                                        <span data-private={""}
                                              className={"participant--name"}>{participant.name}</span>
                                {MyInfo.info?.isHost &&
                                <>
                                    <span onClick={() => IO.kick(participant)}
                                              className={"participant--action-button"}>Kick</span>
                                    <span onClick={() => IO.transferHost(participant).then(onTransfer)}
                                          className={"participant--action-button"}>Transfer Host</span>
                                </>
                                }
                            </div>
                        )
                    })
            }
        </div>
    ));

export default ParticipantList;
