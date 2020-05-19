import React, {useState, useEffect } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import { useDispatch, useSelector } from "react-redux"
import {auth, setAuthRedirectPath} from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'
import { updateObject, checkValidity } from '../../shared/utility'

const Auth = props => {
    
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);
    const buildingBurger = useSelector(state => state.burgerBuilder.building);
    const authRedirectPath = useSelector(state => state.auth.authRedirectPath);
    const dispatch = useDispatch();

    const [ controls, setControls ] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Please check your email address'
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            errorMessage: 'Please check Your password'
        }
    });
    const [ isSignUp, setIsSignUp ] = useState(true)

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            dispatch(setAuthRedirectPath('/'));
        }
    }, [dispatch, authRedirectPath, buildingBurger]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        });
        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(auth(
            controls.email.value, 
            controls.password.value, 
            isSignUp
        ));
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp)
    }

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)}
            errorMessage={formElement.config.errorMessage}
        />
    ));

    if (loading) {
        form = <Spinner />
    }

    let errorMessage = null;
    if(error) {
        errorMessage = (
            <p>{error.message}</p>
        )
    }

    let authRedirect = null;
    if (isAuthenticated) {
        authRedirect = <Redirect to={authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <p>{!isSignUp ? 'SignIn' : 'Signup'}</p>
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success'>Submit</Button>
            </form>
            <Button 
                btnType='Danger' 
                clicked={switchAuthModeHandler}>
                    Switch to {isSignUp ? 'SignIn' : 'Signup'}
                </Button>
        </div>
    );
}

export default Auth;

