import Job from "./../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experience,
      jobType,
      position,
      company,
      created_by,
      application,
    } = req.body;

    const userID = req._id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !experience ||
      !jobType ||
      !position ||
      !company ||
      !created_by ||
      !application
    ) {
      return res.status(404).json({
        message: "Something is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(", "),
      experience,
      salary: Number(salary),
      location,
      jobType,
      position,
      company,
      created_by: userID,
      application,
    });

    return res.status(200).json({
      message: "new job posted succesfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || " ";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query);

    if (!jobs) {
      return res.status(200).json({
        message: "job not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  const jobId = req.params.id;

  const job = await Job.findById(jobId);

  if (!job) {
    return res.status(200).json({
      message: "job not found",
      success: false,
    });
  }

  return res.status(200).json({
    job,
    success : true
  })
};


export const getAdminJobs = async (req ,res) => {
    const adminId = req._id

    const job = await Job.find({created_by:adminId})

    if (!job) {
        return res.status(200).json({
          message: "job not found",
          success: false,
        });
      }
    
      return res.status(200).json({
        job,
        success : true
      })
}