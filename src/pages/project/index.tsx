import { NextPage } from "next";
import Link from "next/link";
import {
  Center,
  Box,
  Heading,
  HStack,
  Spacer,
  Icon,
  Button,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
const IconButton = dynamic(() =>
  import("@chakra-ui/react").then((mod) => mod.IconButton)
);
import ProjectForm from "@/components/project/form";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Project from "@/models/Project";
import { useRouter } from "next/router";
import DatabaseHelper from "@/models/database/DatabaseHelper";
import { useState } from "react";
const CalculationModal = dynamic(
  () => import("@/components/modal/calculation")
);
const SaveModal = dynamic(() => import("@/components/modal/save"));
const DeleteModal = dynamic(() => import("@/components/modal/delete"));
import Calculator from "@/models/Calculator";
const Loading = dynamic(() => import("@/components/loading"));
import dynamic from "next/dynamic";
import AlertModal from "@/components/modal/alert";

const ProjectPage: NextPage = () => {
  // Create an instance of database helper
  const dbHelper = new DatabaseHelper();

  const router = useRouter();

  const toast = useToast();

  // Find the id of project if it's available in the router.
  const id = FindProjectIdFromRouter();

  // Create a null project object to fill it later using possible id in the router.
  var targetProject: Project | undefined = undefined;

  const [isCalcualtionModalOpen, setIsCalculationModalOpen] =
    useState<boolean>(false);

  const [isSaveConfirmModalOpen, setIsSaveConfirmModalOpen] =
    useState<boolean>(false);

  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState<boolean>(false);

  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);

  const [project, setProject] = useState<Project>(new Project());

  const [loading, setLoading] = useState<boolean>(id !== undefined);

  /**
   * If there is an id in the router e.g : {localhost/project/:id} and other conditions are met,
   * try to find a matched project from the local stroage.
   */
  if (id !== undefined && project.id !== id && loading) {
    targetProject = dbHelper.find(id);
    if (targetProject) setProject(targetProject);
    setLoading(false);
  }

  const [showDeleteButton, setShowDeleteButton] = useState<boolean>(
    targetProject ? true : false
  );

  /**
   * Calculates given project using {@link Calculator} and then saves it into the {@link project} variable.
   * @param project - A project to be calculated.
   */
  function calculate(project: Project) {
    // Calculate the project
    const calculatedProject = Calculator.calculate(project);

    // Save calculated project into state
    setProject(calculatedProject);
  }

  /**
   * Deletes a project from the local storage using given id.
   * @param id - Id of a project to delete it.
   */
  function deleteProject(id: string) {
    // delete from storage
    const successful = dbHelper.delete(id);

    if (successful) {
      // set project state as new project
      setProject(new Project());

      // Since project is deleted, go back
      router.back();
    }
  }

  /**
   * Saves given project into the local storage. This function uses {@link project} variable.
   * @param title - Project title
   */
  function saveProject(title: string) {
    project.title = title;

    // Save project
    const successful = dbHelper.addOrUpdate(project);

    // Update the state
    if (successful) {
      setProject(project);
      setShowDeleteButton(true);
      createToast("", "پروژه با موفقیت ذخیره شد.", "success");
    }
  }

  function onProjectTitleClick() {
    if (!project.title) return;
    setIsAlertModalOpen(true);
  }

  /**
   * Creates a toast and displays it.
   * @param title - Toast title
   * @param description - Toast description
   * @param status - Toast status {@link UseToastOptions}
   */
  const createToast = (
    title: String,
    description: String,
    status: UseToastOptions["status"]
  ) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 2000,
      isClosable: false,
    });
  };

  /**
   * Tries to find a possible id of a project if it's available on the router.
   * @returns  project id or undefined.
   */
  function FindProjectIdFromRouter(): string | undefined {
    const router = useRouter();
    const { id } = router.query;
    return id ? (id as string) : undefined;
  }

  /**
   * Renders the content of the page based on the {@link loading} state.
   * @returns react element.
   */
  const renderContent = (): React.ReactElement => {
    if (loading) {
      return <Loading size={"lg"} />;
    }

    return (
      <>
        <ProjectForm
          project={project}
          onCalculate={(project) => {
            calculate(project);
            setIsCalculationModalOpen(true);
          }}
          onSave={(project) => {
            calculate(project);
            setIsSaveConfirmModalOpen(true);
          }}
        />
        <CalculationModal
          project={project!!}
          isModalOpen={isCalcualtionModalOpen}
          onModalClose={() => setIsCalculationModalOpen(false)}
        />
        <SaveModal
          projectTitle={project.title}
          isOpen={isSaveConfirmModalOpen}
          onSaveConfirm={(title) => saveProject(title)}
          onClose={() => setIsSaveConfirmModalOpen(false)}
        />
        <DeleteModal
          isOpen={isDeleteConfirmModalOpen}
          onDeleteConfirm={() => deleteProject(project.id)}
          onClose={() => setIsDeleteConfirmModalOpen(false)}
        />

        {project.title ? (
          <AlertModal
            title={"نام پروژه"}
            text={project.title}
            isOpen={isAlertModalOpen}
            onClose={() => setIsAlertModalOpen(false)}
          />
        ) : null}
      </>
    );
  };

  return (
    <Center>
      <Box
        position="relative"
        w={{
          base: "400px",
          sm: "100%",
          md: "75%",
          lg: "50%",
          xl: "%25",
          "2xl": "30%",
        }}
      >
        <HStack className="header">
          <Heading
            size="md"
            mt="16px"
            mb="16px"
            fontWeight="bold"
            className="truncate"
            cursor={project.title ? "pointer" : "default"}
            maxWidth={{
              base: "170px", // 0px
              sm: "600px", // 480px
              md: "700px", // 768px
              lg: "100%", // 992px
            }}
            onClick={(e) => {
              e.preventDefault();
              onProjectTitleClick();
            }}
          >
            {project.title ?? "پروژه جدید"}
          </Heading>
          <Spacer />
          {showDeleteButton ? (
            <IconButton
              aria-label="Trash"
              size="md"
              colorScheme="red"
              icon={
                <Icon
                  as={BsFillTrash3Fill}
                  w={5}
                  h={5}
                  onClick={() => setIsDeleteConfirmModalOpen(true)}
                />
              }
            />
          ) : null}

          <Link href="/">
            <Button
              className="blackButton"
              rightIcon={<AiOutlineArrowLeft />}
              variant="solid"
            >
              بازگشت
            </Button>
          </Link>
        </HStack>
        <Box position="relative" minH="500px" bg="white" p="16px">
          {renderContent()}
        </Box>
      </Box>
    </Center>
  );
};

export default ProjectPage;
