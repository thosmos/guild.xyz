import {
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import CreatePoap from "components/[guild]/CreatePoap"
import useGuild from "components/[guild]/hooks/useGuild"
import SendDiscordJoinButtonModal from "components/[guild]/Onboarding/components/SummonMembers/components/SendDiscordJoinButtonModal"
import {
  ArrowsCounterClockwise,
  ChatDots,
  Check,
  DotsThree,
  Gear,
} from "phosphor-react"
import DiscordRewardSettings from "./components/DiscordRewardSettings.tsx"
import useSyncMembersFromDiscord from "./hooks/useSyncMembersFromDiscord"

type Props = {
  platformGuildId: string
}

const DiscordCardMenu = ({ platformGuildId }: Props): JSX.Element => {
  const {
    isOpen: isCreatePoapOpen,
    onOpen: onCreatePoapOpen,
    onClose: onCreatePoapClose,
  } = useDisclosure()
  const {
    isOpen: isSendJoinButtonOpen,
    onOpen: onSendJoinButtonOpen,
    onClose: onSendJoinButtonClose,
  } = useDisclosure()
  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
  } = useDisclosure()

  const { poaps } = useGuild()

  const { response, isLoading, triggerSync } = useSyncMembersFromDiscord()

  return (
    <>
      <Menu placement="bottom-end" closeOnSelect={false}>
        <MenuButton
          as={IconButton}
          icon={<DotsThree />}
          aria-label="Menu"
          boxSize={8}
          minW={8}
          rounded="full"
          colorScheme="alpha"
          data-dd-action-name="Discord card menu"
        />

        <MenuList>
          <MenuItem
            icon={
              <Img
                boxSize={3}
                src="/requirementLogos/poap.svg"
                alt="Drop POAP icon"
              />
            }
            onClick={onCreatePoapOpen}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text as="span">{poaps?.length ? "Manage POAPs" : "Drop POAP"}</Text>
              <Tag fontSize="x-small" fontWeight="semibold" h={5} minH={0}>
                Alpha
              </Tag>
            </Stack>
          </MenuItem>
          <MenuItem icon={<ChatDots />} onClick={onSendJoinButtonOpen}>
            Send join button
          </MenuItem>
          <MenuItem
            icon={
              response ? (
                <Check />
              ) : isLoading ? (
                <Spinner boxSize="1em" mb="-2px" />
              ) : (
                <ArrowsCounterClockwise />
              )
            }
            onClick={triggerSync}
            isDisabled={isLoading || response}
          >
            Sync members from Discord
          </MenuItem>
          <MenuItem icon={<Gear />} onClick={onSettingsOpen}>
            Settings
          </MenuItem>
        </MenuList>
      </Menu>

      <CreatePoap
        isOpen={isCreatePoapOpen}
        onOpen={onCreatePoapOpen}
        onClose={onCreatePoapClose}
        discordServerId={platformGuildId}
      />
      <SendDiscordJoinButtonModal
        isOpen={isSendJoinButtonOpen}
        onClose={onSendJoinButtonClose}
        serverId={platformGuildId}
      />
      <DiscordRewardSettings
        isOpen={isSettingsOpen}
        onClose={onSettingsClose}
        serverId={platformGuildId}
      />
    </>
  )
}

export default DiscordCardMenu
