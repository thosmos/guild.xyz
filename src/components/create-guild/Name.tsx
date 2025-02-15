import { FormControl, Input } from "@chakra-ui/react"
import FormErrorMessage from "components/common/FormErrorMessage"
import useDatadog from "components/_app/Datadog/useDatadog"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"

const Name = (): JSX.Element => {
  const { addDatadogAction, addDatadogError } = useDatadog()

  const {
    register,
    formState: { errors },
  } = useFormContext()

  const { onBlur: defaultOnBlur, ...rest } = register("name", {
    required: "This field is required.",
    maxLength: {
      value: 50,
      message: "The maximum possible name length is 50 characters",
    },
  })

  const onBlur = (e) => {
    defaultOnBlur(e)
    if (e.target.value) addDatadogAction("Typed in name")
  }

  useEffect(() => {
    if (!errors.name) return
    addDatadogError("Name error", { error: errors.name })
  }, [errors.name])

  return (
    <FormControl
      isRequired
      isInvalid={!!errors?.name}
      w={{ base: "full", md: "auto" }}
    >
      <Input
        size="lg"
        width={{ base: "full", md: "sm" }}
        {...rest}
        onBlur={onBlur}
      />
      <FormErrorMessage>{errors?.name?.message as string}</FormErrorMessage>
    </FormControl>
  )
}

export default Name
