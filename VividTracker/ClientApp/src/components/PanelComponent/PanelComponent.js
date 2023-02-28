import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TenantContainerComponent from '../TenantContainerComponent/TenantContainerComponent';
import { endpoints } from '../../endpoints';
import './PanelComponent.css';

export default class PanelComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            user: [
                {
                    'name': 'Milen',
                    'date': 'Feb 28',
                    'comment': 'my comment'
                }
            ]
        }
        this.loadComments = this.loadComments.bind(this);
    }
    async componentDidMount() {
        this.loadComments();
    }
    async loadComments() {
        const token = await authService.getAccessToken();
        await fetch(endpoints.loadComments(), {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((res) => this.setState({ comments: res }))
    }
    render() {
        return (
            <div className='commentsListWrapper d-flex justify-content-center align-items-center'>
                <h1>All Tenants </h1>
                <div className='commentsContainer'>
                    <div className='commentsContent'>
                        <div className='commentsListHeaderWrapper d-flex'>
                            <h4 className='commentsListHeader'>Tenants List</h4>
                            <FontAwesomeIcon className='commentsListEditButton' icon={faRectangleList} />
                        </div>
                        <div className='createNewCommentButtonWrapper'>
                            <AddTenant onTenantAdded={this.loadTenants} />
                        </div>
                        <div className='commentsContainer'>
                            {this.state.comments.map((comment) => {
                                return (
                                    <TenantContainerComponent commentData={comment} key={comment.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}
