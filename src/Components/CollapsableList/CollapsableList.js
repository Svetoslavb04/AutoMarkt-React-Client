import {
    List, ListItem, Typography, Collapse
} from '../../mui-imports.js';

export default function CollabsableList(props) {
    return (
        <div className={props.className}>
            {props.collapsable
                ? <Collapse in={props.isOpen}>
                    <List className={props.listClassName}>
                        {props.items.map(item => {
                            return (
                                <ListItem button key={item}>
                                    <Typography variant={props.textFontSize}>{item}</Typography>
                                </ListItem>)
                        })}
                    </List>
                </Collapse>
                : <List className={props.listClassName}>
                    {props.items.map(item => {
                        return (
                            <ListItem button key={item}>
                                <Typography variant={props.textFontSize}>{item}</Typography>
                            </ListItem>)
                    })}
                </List>
            }
        </div>
    );
}