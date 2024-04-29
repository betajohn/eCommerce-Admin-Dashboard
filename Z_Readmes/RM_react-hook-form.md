# react-hook-form tips and tricks

react-hook-form will help us with:

- Managing form data
- Submitting form data
- Enforcing validations and providing visual feedback

## 1.- useForm

This custom hook is the primary tool the react-hook-form library provides for managing forms.
It takes one object as optional argument.

```ts
import { useForm } from 'react-hook-form';

const form = useform();

// or

const form = useform({ options });
```

### form object

```tsx
const form = useform();
// console.log(form)
{
  control: {
    register: [Function: register],
    unregister: [Function: unregister],
    getFieldState: [Function: getFieldState],
    handleSubmit: [Function: handleSubmit],
    setError: [Function: setError],
    _executeSchema: [AsyncFunction: _executeSchema],
    _getWatch: [Function: _getWatch],
    _getDirty: [Function: _getDirty],
    _updateValid: [AsyncFunction: _updateValid],
    _removeUnmounted: [Function: _removeUnmounted],
    _updateFieldArray: [Function: _updateFieldArray],
    _updateDisabledField: [Function: _updateDisabledField],
    _getFieldArray: [Function: _getFieldArray],
    _reset: [Function: _reset],
    _resetDefaultValues: [Function: _resetDefaultValues],
    _updateFormState: [Function: _updateFormState],
    _disableForm: [Function: _disableForm],
    _subjects: { values: [Object], array: [Object], state: [Object] },
    _proxyFormState: {
      isDirty: false,
      dirtyFields: false,
      validatingFields: false,
      touchedFields: false,
      isValidating: false,
      isValid: false,
      errors: false
    },
    _setErrors: [Function: _setErrors],
    _fields: [Getter],
    _formValues: [Getter],
    _state: [Getter/Setter],
    _defaultValues: [Getter],
    _names: [Getter/Setter],
    _formState: [Getter/Setter],
    _options: [Getter/Setter]
  },
  trigger: [AsyncFunction: trigger],
  register: [Function: register],
  handleSubmit: [Function: handleSubmit],
  watch: [Function: watch],
  setValue: [Function: setValue],
  getValues: [Function: getValues],
  reset: [Function: reset],
  resetField: [Function: resetField],
  clearErrors: [Function: clearErrors],
  unregister: [Function: unregister],
  setError: [Function: setError],
  setFocus: [Function: setFocus],
  getFieldState: [Function: getFieldState],
  formState: { defaultValues: [Getter] }
}

```

## 2.- Managing the form's state with react-hook-form

What is a form's state?

- Current value of every field in the form
- wheter a field has been interacted with
- wheter a field value has changed
- wheter the form is invalid
- wheter the fields contain errors
- etc.

We represent the form's state as an object with key-value pairs.

we use react-hook-form take care of the from's state.

## Registering elements into our form object with form.register

```ts
const myForm = useForm();
const {register} =  myForm ; // or myForm.register

//console.log(register)
[Function: register]
```

The register function takes 1 argument: a string which will be the name of the element we are registering.

```ts
const name = register('name');
//console.log(name)

{
  name: 'name',
  onChange: [AsyncFunction: onChange],
  onBlur: [AsyncFunction: onChange],
  ref: [Function: ref]
}
```

Registering an element

```ts
const { register } = useForm();
const { onChange, onBlur, ref } = register('name');
//...
<form>
  <Label htmlFor="n1">Name</Label>
  <Input id="n1" onBlur={onBlur} onChange={onChange} ref={ref} />
  //the onChange function will be executed when input.value changes
</form>;
```

> [!IMPORTANT] The ref attribute
> It's not standard html atribute.
>
> Comes from the useRef hook.
>
> ```text
> In react 'ref' is used as a special attribute to reference a particular instance of a DOM element or a React component.
> ```

- Shorter and cleaner version but a skill level higher.

Uses destructuring.

Uses the tsx/jsx syntax for embedding js expressions within html

```ts
<Label htmlFor="n1">Name</Label>
<Input id="n1" {...register('name')}/>

<Label htmlFor="a1">Age</Label>
<Input id="a1" input='number' {...register('age')} />

<Label htmlFor="o1">Occupation</Label>
<Input id="o1" {...register('occupation')} />

```

**_When we register all our elements, react-hook-form is in charge of our form state._**

## 3.- Accessing the form state

### Reading the current values with form.getValues()

```tsx
const { register, getValues } = useForm();

//button.onclick(getValues)
{
  age: 19;
  name: 'juan';
  occupation: 'student';
}
```

### Reading the current form item status with control.getFieldState()

```tsx
const { register, getValues, control } = useForm();

//button.onclick(control.getFieldState('name'))
//Gets the state of the field registered by form.register('name')
{
  error: undefined;
  invalid: false;
  isDirty: true; // info has been written or deleted (or both)
  isTouched: true; // has been clicked-on or touched
  isValidating: false;
}
```

> [!TIP] you can see all this in real time with
> @hookform/devtools

## 4. Handling from submissions with react-hook-form

1.- Define your submit function that will be called when submit button is activated

```tsx
function onSubmit() {
  //Do your stuff
}
```

2.- Get form.handleSubmit() and pass it to the html form onSubmit property

```js
const { handleSubmit, register, control } = useForm();

//type error: data has implicit type any
function onSubmit(data) {
  //we get the data argument handleSubmit()
  //Do your stuff
  //submit data to db
}

//...

<form onSubmit={handleSubmit(onSubmit)}></form>;
```

3.- Define the types of your data

```ts
interface FormData {
  name: string;
  age: number;
  occupation: string;
}

function onSubmit(data: FormValues) {
  //we get the data argument handleSubmit()
  //Do your stuff
  //submit data to db
}

//...

//typeError type FormData not assignable to type 'SubmitHandler<FieldValues>'.
<form onSubmit={handleSubmit(onSubmit)}></form>;
```

4.- Define the type of the useForm function parameter

```ts
const { handleSubmit, register, control } = useForm<FormData>();
```

## 5. Validation

### onsubmit Validation

By default in html, form validation is handled by the browser and only occurs onSubmit.

Use html form's **noValidate** prop to forbid browsers from performing any validations.

```tsx
<form noValidate onSubmit={handleSubmit(onSubmit)}></form>
```

### Doing validation with react-hook-form

Pass a second parameter to the form.register function

```tsx
<Label htmlFor="n1">Name</Label>
<Input id="n1" {...register('name',{
  required: 'Name is required'
})}/>
```

When the user tries to submit the form with no 'name' value, react-hook-form will prevent the submission.

> User clicks submit in a form with empty required 'name' field:

```ts
//console.log(control.getFieldState('name'));
{
  error: {
    message: 'Name is required';
    type: 'required';
    ref: reactElement;
  }
  invalid: true;
  isDirty: false;
  isTouched: true;
  isValidating: false;
}
```

More react-hook-form validation types.

```tsx
<Label htmlFor="e1">Email</Label>
<Input id="e1" {...register('email',{
  pattern: {value:'/^\S+@\S+\.\S+$/', //must have @ symbol
    message:'email must have the @ symbol'
  }
})}/>
```

### Doing validation with Zod
