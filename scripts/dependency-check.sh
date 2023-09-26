
#! /bin/bash
#
# Call ./MRO.Scripts/dependency-check.sh from root of project
# YARN_FAIL_LEVEL, If the return value of yarn audit is greater than or equal to this value, the job will fail.
#     see https://classic.yarnpkg.com/lang/en/docs/cli/audit/
# DOTNET_FAIL_LEVEL is a string containing severity levels that would cause the job to fail.  
#     For example, to make any vunlerability fail the script, the string would be "critical\|high\|moderate\|low"
# YARN_DIR is the directory in which we call yarn commands
# DOTNET_RESTORE_DIR is the directory in which we call dotnet restore ...
# DOTNET_LIST_DIR is the directory in which we call dotnet list ...
#------------------------------------------------------------------------------------------------------------------

echo YARN_FAIL_LEVEL is $YARN_FAIL_LEVEL
echo DOTNET_FAIL_LEVEL is $DOTNET_FAIL_LEVEL
echo YARN_DIR is $YARN_DIR
echo DOTNET_RESTORE_DIR is $DOTNET_RESTORE_DIR
echo DOTNET_LIST_DIR is $DOTNET_LIST_DIR

yarn --cwd $YARN_DIR audit; 
yarnAuditReturn=$?
echo yarnAuditReturn is $yarnAuditReturn
if [[ $yarnAuditReturn -ge $YARN_FAIL_LEVEL ]] 
then
  echo "yarn dependency check failed"; export yarnReturnValue=1; 
else
  echo "yarn dependency check passed"; export yarnReturnvalue=0;  
fi

if [[ $yarnReturnValue -eq 0 && $dotnetReturnValue -eq 0 ]]
then
  echo "Dependency Check passed"
  exit 0
else
  echo "Dependency Check failed"
  exit 1
fi
