import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../hoc/axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import {purchaseBurger} from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility'

const ContactData = () => {
    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const loading = useSelector(state => state.order.loading);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Error en el nombre'
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Error en la calle'
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false,
            errorMessage: 'Error en el ZIP code'
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Error en el país'
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-mail'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Error en el e-mail'
        },
        deliveryMethod: {
            elementType: 'select',
            valid: true,
            validation: {},
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: 'fastest'
        }
    });
    const [ formIsValid, setFormIsValid ] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        
        const order = {
            ingredients: ings,
            price: price,
            orderData: formData,
            userId: userId
        }

        dispatch(purchaseBurger(order, token));
    }

    const inputChangedHandler = (event,inputIdentifier) => {
        
        const updatedFormElement = updateObject (orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true 
        });

        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        let TestFormIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            TestFormIsValid = updatedOrderForm[inputIdentifier].valid && TestFormIsValid;
            
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(TestFormIsValid);
    }
    
    
    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                    errorMessage={formElement.config.errorMessage} />
            ))}
            <Button clicked={orderHandler} btnType='Success' disabled={!formIsValid}>ORDER</Button>
        </form>
    );
    if (loading) {
        form = <Spinner />
    } 

    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    )
}

export default withErrorHandler(ContactData, axios);