import React, {useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid,
    TextareaAutosize, Typography
} from "@material-ui/core";
import MaterialTable, {MTableToolbar} from "material-table";

import {tableIcons} from "./tableIcons";
import {
    Queue,
    RemoveShoppingCart
} from "@material-ui/icons";

type IState = 'pending'|'failed'|'working';

type ILink = {
    url: string,
    state: IState,
};

export const MainView  = () => {
    const [linkList, setLinkList] = useState<ILink[]>([]);
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [textAreaContent, setTextAreaContent] = useState('');

    const addLinks = (urls: string[]) => {
        setLinkList(linkList.concat(urls.map(url=>({url, state: "pending"}))));
    };

    return(
        <Box style={{
            height: '100%',
            width: '100%'
        }}>
            <Dialog open={isShowDialog} onClose={()=>setIsShowDialog(false)} maxWidth={"md"} fullWidth={true}>
                <DialogTitle>
                    Enter Links Here
                </DialogTitle>
                <DialogContent>
                    <TextareaAutosize
                        value={textAreaContent}
                        onChange={(e)=>setTextAreaContent(e.target.value)}
                        style={{width: '100%'}}
                        rowsMin={30}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{
                        addLinks(textAreaContent.split('\n').map(v=>v.trim()).filter(v=>v.length));
                        setIsShowDialog(false);
                    }} color={"primary"}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <MaterialTable
                icons={tableIcons}
                title={'CDN links Checker'}
                columns={[
                    { title: 'URL', field: 'url'},
                    { title: 'State', field: 'state'},
                    {
                        title: 'Image Preview',
                        field: 'url',
                        render: linkData =><img
                            src={linkData.url}
                            alt={'FAIL'}
                            style={{width: 25, height: 25}}
                            onError={()=>{
                                linkData.state = 'failed';
                                const newLinkList = [...linkList];
                                setLinkList(newLinkList);
                            }}
                            onLoad={()=>{
                                linkData.state = 'working';
                                const newLinkList = [...linkList];
                                setLinkList(newLinkList);
                            }}
                        />,
                    },
                ]}
                data={linkList}
                actions={[
                    {
                        icon: ()=><Queue />,
                        isFreeAction: true,
                        tooltip: 'Add Links',
                        onClick: ()=>{
                            setIsShowDialog(true);
                        }
                    },
                    {
                        icon: ()=><RemoveShoppingCart />,
                        isFreeAction: true,
                        tooltip: 'Clear Links',
                        onClick: ()=>{
                            setLinkList([]);
                        }
                    },
                ]}
                options={{
                    paging: false,
                }}
                style={{
                    height: '100%',
                    overflow: "auto",
                }}
                components={{
                    Toolbar: props => (
                        <div>
                            <MTableToolbar {...props} />
                            <Box ml={3}>
                                <Grid container spacing={3}>
                                    <Grid item>
                                        <Typography variant={"subtitle1"}>
                                            Total: {linkList.length}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant={"subtitle1"}>
                                            Success: {linkList.filter(v=>v.state==="working").length}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant={"subtitle1"}>
                                            Failed: {linkList.filter(v=>v.state==="failed").length}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    )
                }}
            />
        </Box>
    )
};
