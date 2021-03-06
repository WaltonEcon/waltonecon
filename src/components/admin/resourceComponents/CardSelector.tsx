import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid} from '@material-ui/core'
import {useMemo, MouseEvent} from 'react'
import ResourceCard from '../../resources/ResourceCard'
import {IClientResource} from '../../../database/modelInterfaces'
import shortenDesc from '../../../utils/shortenDesc'

const useStyles = makeStyles(theme => ({
    root: {
        overflowX: 'scroll',
    },
    gridItem: {
        minWidth: 300,
        margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        cursor: 'pointer'
    }
}))

interface Props {
    resources: IClientResource[];
    editedResources: boolean[];
    selectedResource: number;
    setSelectedResource: (i:number) => void;
}

export default function CardSelector({resources:rawResources, editedResources, selectedResource, setSelectedResource}:Props) {

    // reduce description char length to max of 50
    const resources:IClientResource[] = useMemo(() => {
        return shortenDesc(rawResources)
    }, [rawResources])

    const handleClick = (e:MouseEvent, index:number) => {
        e.preventDefault() // if editor clicks on the link, will not be redirected
        setSelectedResource(index)
    }

    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Grid container alignItems="stretch" wrap="nowrap" >
                {resources.map((resource, i) => (
                    <Grid key={resource._id} item className={classes.gridItem} style={{
                        border: `${selectedResource === i ? 2 : 1}px solid ${editedResources[i] ? '#ffb74d' : '#000'}`,
                        borderRadius: 4
                    }} onClick={(e) => handleClick(e, i)}>
                        <ResourceCard resource={resource} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}