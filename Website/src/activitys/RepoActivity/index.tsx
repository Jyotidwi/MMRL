import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListSubheader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRepos } from "@Hooks/useRepos";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { os } from "@Native/Os";
import { useStrings } from "@Hooks/useStrings";
import { Page } from "@Components/onsenui/Page";
import { RecommendedRepo } from "./components/RecommendedRepo";
import { LocalRepository } from "./components/LocalRepository";
import { useNetwork } from "@Hooks/useNetwork";

const recommended_repos = [
  {
    name: "Magisk Modules Alternative Repository",
    module_count: 100,
    link: "https://api.mmrl.dergoogler.com/json/mmar.json",
  },
  {
    name: "Googlers Magisk Repo",
    module_count: 5,
    link: "https://api.mmrl.dergoogler.com/json/gmr.json",
  },
  {
    name: "Magisk Modules Repo (Official)",
    module_count: 100,
    link: "https://api.mmrl.dergoogler.com/json/mmr.json",
  },
];

const MemoizdRecommendedRepos = React.memo<{ filteredRepos: StoredRepo[] }>((props) => {
  const { strings } = useStrings();
  return (
    <>
      {props.filteredRepos.length !== 0 && <Divider />}
      <List
        subheader={
          <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>{strings("explore_repositories")}</ListSubheader>
        }
      >
        {recommended_repos.map((repo, index) => (
          <RecommendedRepo key={repo.name + "_" + index} name={repo.name} moduleCount={repo.module_count} link={repo.link} />
        ))}
      </List>
    </>
  );
});

const RepoActivity = () => {
  const { isNetworkAvailable } = useNetwork();
  const { context } = useActivity();
  const { strings } = useStrings();

  const { repos, actions } = useRepos();
  const [repoLink, setRepoLink] = React.useState("");
  const [search, setSearch] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (isNetworkAvailable) {
      setOpen(true);
    } else {
      os.toast("Please chack your internet connection", Toast.LENGTH_SHORT);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRepoLinkChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRepoLink(event.target.value);
  };

  const filteredRepos = React.useMemo(
    () => repos.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
    [repos, search]
  );

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{strings("repositories")}</Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button icon={Add} onClick={handleClickOpen} />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  return (
    <>
      <Page renderToolbar={renderToolbar}>
        <Page.RelativeContent zeroMargin>
          {filteredRepos.map((repo, index) => (
            <LocalRepository key={"repo_" + repo.name + "_" + index} repo={repo} />
          ))}

          {isNetworkAvailable && <MemoizdRecommendedRepos filteredRepos={filteredRepos} />}
        </Page.RelativeContent>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{strings("add_repository")}</DialogTitle>
          <DialogContent>
            <DialogContentText>{strings("add_repository_description")}</DialogContentText>
            <TextField
              autoFocus
              name="repo_link"
              fullWidth
              margin="dense"
              type="text"
              label={"Modules link"}
              value={repoLink}
              variant="outlined"
              onChange={handleRepoLinkChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{strings("cancel")}</Button>
            <Button
              onClick={() => {
                actions.addRepo({
                  url: repoLink,
                  callback: (state) => {
                    setRepoLink("");
                    handleClose();
                  },
                  error: (error) => {
                    setRepoLink("");
                    os.toast(error, Toast.LENGTH_SHORT);
                    handleClose();
                  },
                });
              }}
            >
              {strings("add")}
            </Button>
          </DialogActions>
        </Dialog>
      </Page>
    </>
  );
};

export default RepoActivity;
